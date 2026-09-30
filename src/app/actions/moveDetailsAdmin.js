"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { getBookingMoveDetails, createWorkerFileLink, getWorkerBooking, recordWorkerActivity } from "@/lib/workerApi";
import { sendMoveDetailsLink } from "@/lib/email";
import { BUSINESS } from "@/config/business";

// A server action can be called by anyone who can reach the site, from any
// page, so the login on the /admin pages does not cover it: each action
// checks the session itself.
async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = token ? await decrypt(token) : null;
  if (!session) throw new Error("Unauthorized");
  return session;
}

// An id ends up in the API's path. workerApi encodes it, which deals with
// everything except "." and "..", and a URL reads those as folders.
function cleanId(value) {
  const id = typeof value === "string" ? value.trim() : "";
  return id && id.length <= 100 && !/^\.+$/.test(id) ? id : "";
}

// When the API turns a request down, its message ("Booking not found") is
// written to be read. A timeout, a dropped connection or a fault on its side
// is not, so those get a sentence instead. So does the API refusing the
// site's own PIN: its word for that is "Unauthorized", which here has to mean
// only that the person is not signed in.
function plainMessage(error) {
  const status = error?.status;
  if (status === 401 || status === 403) return "The bookings system refused the request.";
  if (status >= 400 && status < 500 && error.message) return error.message;
  return "The bookings system did not answer. Try again in a moment.";
}

/** A booking's move details for the admin: the customer's link, their answers and their files. */
export async function loadBookingMoveDetails(bookingId) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const id = cleanId(bookingId);
    if (!id) return { success: false, error: "Booking not found" };

    const data = await getBookingMoveDetails(id);
    if (!data || typeof data !== "object") {
      return { success: false, error: "The bookings system sent nothing back for this booking." };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Failed loading move details:", error?.message);
    return { success: false, error: plainMessage(error) };
  }
}

/**
 * Emails the customer their move details link, from Booking Details. The link
 * is made if the enquiry has none yet (an enquiry from before the emails
 * carried it). An unfinished quote has no link and is refused. The email is
 * recorded in the activity log, without the link, which is the key to it.
 */
export async function emailMoveDetailsLink(bookingId) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const id = cleanId(bookingId);
    if (!id) return { success: false, error: "Booking not found" };

    const booking = await getWorkerBooking(id);
    if (!booking?.customer?.email) return { success: false, error: "This customer has no email address." };
    if (booking.status === "Abandoned") {
      return { success: false, error: "This quote was not finished, so it has no move details link." };
    }
    const details = await getBookingMoveDetails(id);
    if (typeof details?.token !== "string" || !details.token) {
      return { success: false, error: "The bookings system did not give a link for this enquiry." };
    }

    const detailsUrl = `${BUSINESS.url}/move-details/${encodeURIComponent(details.token)}`;
    const sent = await sendMoveDetailsLink({ booking, detailsUrl });
    if (!sent?.success) return { success: false, error: `The email was not sent: ${sent?.error || "unknown error"}.` };

    try {
      await recordWorkerActivity({
        action: "booking.details_link_emailed",
        entityId: id,
        actor: "admin",
        details: JSON.stringify({ summary: `Emailed ${booking.customer.fullName || "the customer"} their move details link` }),
      });
    } catch (error) {
      // The email has gone; a missing log line is not worth reporting as a failure.
      console.error("Failed recording the link email:", error?.message);
    }
    return { success: true, to: booking.customer.email };
  } catch (error) {
    console.error("Failed emailing the move details link:", error?.message);
    return { success: false, error: plainMessage(error) };
  }
}

/** A short-lived address for one of a booking's photos or files, for the admin to open in a new tab. */
export async function openBookingFile(fileId) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const id = cleanId(fileId);
    if (!id) return { success: false, error: "File not found" };

    const link = await createWorkerFileLink(id);
    // The browser is sent straight to this address, so it has to be a web one.
    if (typeof link?.url !== "string" || !/^https?:\/\//i.test(link.url)) {
      return { success: false, error: "The bookings system did not give a link for this file." };
    }
    return { success: true, url: link.url };
  } catch (error) {
    console.error("Failed creating a file link:", error?.message);
    return { success: false, error: plainMessage(error) };
  }
}
