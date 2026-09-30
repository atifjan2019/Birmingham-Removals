"use server";

import { calculateQuote } from "@/lib/quoteCalculator";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { sendEnquiryReceived, sendAdminNotification } from "@/lib/email";
import {
  createWorkerBooking,
  getBookingMoveDetails,
  getWorkerBooking,
  recordWorkerActivity,
  updateWorkerBooking,
  deleteWorkerBooking,
} from "@/lib/workerApi";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { BUSINESS } from "@/config/business";

const EMAIL_WAIT_TIMEOUT_MS = 1500;

// A server action can be called by anyone who posts to any page with its id,
// so the middleware's /admin guard is not enough: each admin-only action below
// checks the session itself. createBooking and captureAbandonedLead stay open,
// because the public quote form calls them.
async function isAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const session = token ? await decrypt(token) : null;
    return Boolean(session?.userId);
  } catch {
    return false;
  }
}

const UNAUTHORIZED = { success: false, error: "Unauthorized" };

/** A customer's own link to the move details form for their enquiry. */
function detailsUrlFor(booking) {
  return booking?.detailsToken ? `${BUSINESS.url}/move-details/${booking.detailsToken}` : undefined;
}

// The quote form's own id for the lead it is filling in, kept in the visitor's
// browser. The API stores it with the lead, and it is what lets that browser
// repeat the call that finishes the lead when the first answer is lost.
function leadKeyFrom(formData) {
  return String(formData?.abandonedLeadId || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
}

function refreshAdminData() {
  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/customers");
  revalidatePath("/admin/reports");
  revalidatePath("/admin/activity");
}

function normalizeEmailResult(result) {
  if (result.status === "rejected") {
    return { status: "failed", error: result.reason?.message || String(result.reason || "Email failed") };
  }

  return result.value?.success
    ? { status: "sent" }
    : { status: "failed", error: result.value?.error || "Email failed" };
}

async function sendBookingEmails(emailData, timeoutMs = EMAIL_WAIT_TIMEOUT_MS) {
  const timeout = new Promise((resolve) => {
    setTimeout(() => resolve("timeout"), timeoutMs);
  });
  const emailPromise = Promise.allSettled([
    sendEnquiryReceived(emailData),
    sendAdminNotification(emailData),
  ]);

  const result = await Promise.race([emailPromise, timeout]);

  if (result === "timeout") {
    console.warn("[EMAIL] Sending took too long; booking was saved and response continued.");
    return {
      customer: { status: "pending", error: "Timed out while sending" },
      admin: { status: "pending", error: "Timed out while sending" },
    };
  }

  const [customerResult, adminResult] = result;
  const status = {
    customer: normalizeEmailResult(customerResult),
    admin: normalizeEmailResult(adminResult),
  };

  Object.values(status)
    .filter((item) => item.status === "failed")
    .forEach((item) => console.error("[EMAIL] Failed to send:", item.error));

  return status;
}

async function recordEmailStatus(bookingId, status, source = "booking_created") {
  try {
    await recordWorkerActivity({
      action: "booking.email_status",
      entityId: bookingId,
      actor: "app",
      details: JSON.stringify({
        summary: "Booking email status updated",
        source,
        customer: status.customer,
        admin: status.admin,
      }),
    });
  } catch (error) {
    console.error("[EMAIL] Failed recording email status:", error.message);
  }
}

function buildBookingPayload(formData, fallbackStatus = "New") {
  const {
    moveType,
    fromPostcode,
    toPostcode,
    moveDate,
    bedrooms,
    extras,
    fullName,
    phone,
    email,
    status,
    price,
  } = formData;

  const quote = calculateQuote(moveType, bedrooms || 1, extras || []);
  const estimatedPrice = price ?? quote.min;

  return {
    fullName,
    phone,
    email,
    moveType,
    fromPostcode,
    toPostcode,
    moveDate,
    bedrooms: parseInt(bedrooms) || 0,
    extras: extras || [],
    status: status || fallbackStatus,
    price: estimatedPrice,
  };
}

export async function createBooking(formData) {
  try {
    const payload = buildBookingPayload(formData);
    const abandonedBookingId = String(formData?.abandonedBookingId || "").trim();
    // Only a booking the office adds (a signed-in admin, from the manual booking
    // form) joins the customer record that already has the same email. The
    // public quote form always gets a record of its own, so nobody can change
    // another customer's details by typing their address.
    const newBooking = { ...payload, reuseCustomer: await isAdmin() };
    let booking;

    if (abandonedBookingId) {
      let converted = false;
      try {
        // The id comes from the visitor's browser, so this may only ever finish
        // a booking that is still an untouched lead (onlyIfLead). Anything
        // else is refused by the API, and the enquiry is made afresh below.
        booking = await updateWorkerBooking(abandonedBookingId, {
          ...payload,
          onlyIfLead: true,
          leadKey: leadKeyFrom(formData),
        });
        // A second press of submit after the answer to the first was lost: the
        // enquiry was made and its emails sent the first time round.
        if (booking?.alreadyFinished) {
          return { success: true, bookingId: booking.id, detailsToken: booking.detailsToken || null };
        }
        converted = true;
      } catch (error) {
        console.error("Failed converting abandoned booking, creating a new booking instead:", error);
        booking = await createWorkerBooking(newBooking);
      }

      // On its own, so that a log entry that fails cannot be mistaken for a
      // failed enquiry and make a second one.
      if (converted) {
        try {
          await recordWorkerActivity({
            action: "lead.abandoned_converted",
            entityId: booking.id,
            actor: "app",
            details: JSON.stringify({
              summary: `Abandoned lead converted to booking for ${payload.fullName}`,
              customer: { fullName: payload.fullName, phone: payload.phone, email: payload.email },
              moveType: payload.moveType,
              route: `${payload.fromPostcode} to ${payload.toPostcode}`,
            }),
          });
        } catch (error) {
          console.error("Failed recording the converted lead:", error.message);
        }
      }
    } else {
      booking = await createWorkerBooking(newBooking);
    }

    // The worker returns the created row; guard against a null/id-less response
    // so we surface a clean error instead of throwing on booking.id below.
    if (!booking || !booking.id) {
      throw new Error("Booking was not saved (empty response from API).");
    }

    const emailData = {
      // The address as the API stored it (checked and trimmed), not as typed.
      email: booking.customer?.email || payload.email,
      fullName: payload.fullName,
      phone: payload.phone,
      moveType: payload.moveType,
      fromPostcode: payload.fromPostcode,
      toPostcode: payload.toPostcode,
      moveDate: payload.moveDate,
      bedrooms: payload.bedrooms,
      extras: payload.extras,
      estimatedPrice: payload.price,
      bookingId: booking.id,
      detailsUrl: detailsUrlFor(booking),
    };

    // Send emails AFTER the response so a slow SMTP handshake never delays the
    // booking confirmation — and, critically, so the serverless function is not
    // frozen mid-send (the old 1.5s race silently dropped slow emails). after()
    // keeps the invocation alive until the sends complete.
    after(async () => {
      try {
        const results = await Promise.allSettled([
          sendEnquiryReceived(emailData),
          sendAdminNotification(emailData),
        ]);
        const emailStatus = {
          customer: normalizeEmailResult(results[0]),
          admin: normalizeEmailResult(results[1]),
        };
        await recordEmailStatus(booking.id, emailStatus, "booking_created");
      } catch (err) {
        console.error("[EMAIL] post-response send failed:", err?.message);
      }
    });

    refreshAdminData();
    return { success: true, bookingId: booking.id, detailsToken: booking.detailsToken || null };
  } catch (error) {
    console.error("Failed storing booking:", error);
    return { success: false, error: error.message || "System failed to save booking right now." };
  }
}

/**
 * Sends the enquiry emails again. Takes the booking's id and reads the booking
 * afresh: the copy in the office's browser can be behind (an email address
 * corrected a moment ago, a details link made since the list loaded), and the
 * customer's email carries their private link, so it has to go to the address
 * on record now.
 */
export async function resendBookingEmails(bookingOrId) {
  if (!(await isAdmin())) return UNAUTHORIZED;
  try {
    const id = typeof bookingOrId === "string" ? bookingOrId : bookingOrId?.id;
    if (!id || typeof id !== "string") return { success: false, error: "Booking not found" };

    const booking = await getWorkerBooking(id);
    // Also gives an enquiry from before details links existed its link. A lead has none.
    const moveDetails = await getBookingMoveDetails(id);
    booking.detailsToken = moveDetails?.token || null;

    const emailData = {
      email: booking.customer?.email,
      fullName: booking.customer?.fullName,
      phone: booking.customer?.phone,
      moveType: booking.moveType,
      fromPostcode: booking.fromPostcode,
      toPostcode: booking.toPostcode,
      moveDate: booking.moveDate,
      bedrooms: booking.bedrooms,
      extras: booking.extras || [],
      estimatedPrice: booking.price,
      bookingId: booking.id,
      detailsUrl: detailsUrlFor(booking),
    };

    const emailStatus = await sendBookingEmails(emailData, 10000);
    await recordEmailStatus(booking.id, emailStatus, "manual_resend");
    refreshAdminData();

    return { success: true, emailStatus };
  } catch (error) {
    console.error("Failed resending booking emails:", error);
    return { success: false, error: error.message || "Failed to resend booking emails." };
  }
}

export async function updateBookingDetails(id, data) {
  if (!(await isAdmin())) return UNAUTHORIZED;
  try {
    await updateWorkerBooking(id, data);
    refreshAdminData();
    return { success: true };
  } catch (error) {
    console.error("Failed updating booking details:", error);
    return { success: false, error: error.message || "Failed to update booking details." };
  }
}

export async function updateBookingStatus(id, status) {
  if (!(await isAdmin())) return UNAUTHORIZED;
  try {
    await updateWorkerBooking(id, { status });
    refreshAdminData();
    return { success: true };
  } catch (error) {
    console.error("Failed updating booking:", error);
    return { success: false, error: error.message || "Failed to update booking status." };
  }
}

export async function updateBookingFinancials(id, jobCost, expenses) {
  if (!(await isAdmin())) return UNAUTHORIZED;
  try {
    await updateWorkerBooking(id, {
      jobCost: parseFloat(jobCost) || 0,
      expenses: parseFloat(expenses) || 0,
    });
    refreshAdminData();
    return { success: true };
  } catch (error) {
    console.error("Failed updating financials:", error);
    return { success: false, error: error.message || "Failed to update financials." };
  }
}

export async function deleteBooking(id) {
  if (!(await isAdmin())) return UNAUTHORIZED;
  try {
    await deleteWorkerBooking(id);
    refreshAdminData();
    return { success: true };
  } catch (error) {
    console.error("Failed deleting booking:", error);
    return { success: false, error: error.message || "Failed to delete booking." };
  }
}

export async function captureAbandonedLead(formData) {
  try {
    const {
      abandonedLeadId,
      abandonedBookingId,
      moveType,
      fromPostcode,
      toPostcode,
      moveDate,
      bedrooms,
      extras,
      fullName,
      phone,
      email,
    } = formData || {};

    const leadId = String(abandonedLeadId || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
    if (!leadId) return { success: false };

    const safeMoveType = String(moveType || "Unknown").trim() || "Unknown";
    const safeExtras = Array.isArray(extras) ? extras : [];
    const estimatedPrice = calculateQuote(safeMoveType, bedrooms || 1, safeExtras).min || 0;
    const validEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const validPhone = typeof phone === "string" && phone.trim().length >= 10;
    const validFullName = typeof fullName === "string" && fullName.trim().length >= 2;
    const validMoveDate = typeof moveDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(moveDate);

    const createPayload = {
      fullName: validFullName ? fullName.trim() : "Partial Lead",
      phone: validPhone ? phone.trim() : "Not provided",
      email: validEmail ? email.trim().toLowerCase() : `abandoned_${leadId}@pending.com`,
      moveType: safeMoveType,
      fromPostcode: String(fromPostcode || "Unknown").trim() || "Unknown",
      toPostcode: String(toPostcode || "Unknown").trim() || "Unknown",
      moveDate: validMoveDate ? moveDate : new Date().toISOString().slice(0, 10),
      bedrooms: parseInt(bedrooms) || 0,
      extras: safeExtras,
      status: "Abandoned",
      price: estimatedPrice,
    };

    if (abandonedBookingId) {
      const patch = {
        status: "Abandoned",
        price: estimatedPrice,
        extras: safeExtras,
        // The id comes from the visitor's browser: only a booking that is
        // still an untouched lead may be changed by it.
        onlyIfLead: true,
      };

      if (safeMoveType !== "Unknown") patch.moveType = safeMoveType;
      if (fromPostcode) patch.fromPostcode = String(fromPostcode).trim();
      if (toPostcode) patch.toPostcode = String(toPostcode).trim();
      if (validMoveDate) patch.moveDate = moveDate;
      if (bedrooms !== undefined && bedrooms !== null && bedrooms !== "") patch.bedrooms = parseInt(bedrooms) || 0;
      if (validFullName) patch.fullName = fullName.trim();
      if (validPhone) patch.phone = phone.trim();
      if (validEmail) patch.email = email.trim().toLowerCase();

      let booking;
      try {
        booking = await updateWorkerBooking(abandonedBookingId, patch);
      } catch (error) {
        // The booking is no longer a lead: the visitor has finished the form,
        // and this is a save that set off before they did. There is no lead to
        // keep up to date, and making another would show the office a lead for
        // somebody who has already sent an enquiry.
        if (error.status === 409) return { success: true, bookingId: abandonedBookingId };
        console.error("Failed updating abandoned lead, creating a fresh abandoned lead instead:", error);
        booking = await createWorkerBooking({ ...createPayload, leadKey: leadId });
      }

      refreshAdminData();
      return { success: true, bookingId: booking.id };
    }

    const booking = await createWorkerBooking({ ...createPayload, leadKey: leadId });

    refreshAdminData();
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed capturing abandoned lead:", error);
    return { success: false };
  }
}
