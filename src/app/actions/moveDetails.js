"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { sendMoveDetailsReceived } from "@/lib/email";
import { recordWorkerActivity, submitWorkerMoveDetails } from "@/lib/workerApi";

// A details link's token: 32 random bytes as base64url.
const TOKEN = /^[A-Za-z0-9_-]{43}$/;
const SECTIONS = ["from", "to", "items", "dismantle", "movers"];

/**
 * The customer pressing "Send my move details". Open to the public, like the
 * quote form: the token in the customer's link is what authorises it, and the
 * API checks that token and the answers itself. It goes through the server,
 * rather than from the browser straight to the API as the saves do, so that
 * details can never be marked as sent without the office being emailed.
 *
 * `payload` is { details, baseVersion, saveId, sentIds }: the answers, and
 * which version of them the page started from, so a page that has fallen
 * behind another device cannot send the office an old copy.
 */
export async function submitMoveDetails(token, payload) {
  if (typeof token !== "string" || !TOKEN.test(token)) {
    return { success: false, error: "This link is not valid. Please use the link in your email, or call us." };
  }
  const details = payload?.details;
  if (!details || typeof details !== "object" || Array.isArray(details)) {
    return { success: false, error: "We could not read your answers. Please refresh the page and try again." };
  }

  let result;
  try {
    result = await submitWorkerMoveDetails(token, {
      details,
      baseVersion: payload.baseVersion,
      saveId: payload.saveId,
      sentIds: payload.sentIds,
    });
  } catch (error) {
    if (error.status === 404) {
      return { success: false, error: "This link is no longer in use. Please call us and we will take your details." };
    }
    if (error.status === 409 && error.data) {
      // Changed on another device since this page last looked: the form puts
      // the two sets of answers together and asks the customer to check them.
      return { success: false, conflict: true, current: error.data };
    }
    if (error.status === 429) {
      return {
        success: false,
        error:
          "Your answers are saved, but they have already been sent to us several times today. Please call us if something has changed.",
      };
    }
    if (error.status === 400 && error.details) {
      // Which sections the API found unfinished, for the form to point at.
      const fields = Object.fromEntries(
        SECTIONS.filter((key) => typeof error.details[key] === "string").map((key) => [key, error.details[key]])
      );
      return { success: false, error: "Some answers are missing above.", fields };
    }
    console.error("[MOVE DETAILS] Submit failed:", error.message);
    return { success: false, error: "We could not send your details just now. Please try again in a minute, or call us." };
  }

  // The API says when the office is due an email: for a send with something
  // new in it, or for a repeat of one it was never emailed about. It is sent
  // after the response, rather than holding the customer on a slow mail
  // server, and recorded once it has gone, which is how the API knows.
  if (result.notify !== false) {
    after(async () => {
      try {
        const sent = await sendMoveDetailsReceived(result);
        if (!sent?.success) {
          console.error("[MOVE DETAILS] Office email failed:", sent?.error);
          return;
        }
        await recordWorkerActivity({
          action: "booking.details_notified",
          entityId: result.booking.id,
          actor: "app",
          details: JSON.stringify({ summary: "Office emailed the customer's move details" }),
        });
      } catch (error) {
        console.error("[MOVE DETAILS] Office email failed:", error.message);
      }
    });
  }

  revalidatePath("/admin/bookings");
  return { success: true, version: result.version ?? null };
}
