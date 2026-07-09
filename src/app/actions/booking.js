"use server";

import { calculateQuote } from "@/lib/quoteCalculator";
import { revalidatePath } from "next/cache";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email";
import {
  createWorkerBooking,
  recordWorkerActivity,
  updateWorkerBooking,
  deleteWorkerBooking,
} from "@/lib/workerApi";

const EMAIL_WAIT_TIMEOUT_MS = 1500;

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
    sendBookingConfirmation(emailData),
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
    let booking;

    if (abandonedBookingId) {
      try {
        booking = await updateWorkerBooking(abandonedBookingId, payload);
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
        console.error("Failed converting abandoned booking, creating a new booking instead:", error);
        booking = await createWorkerBooking(payload);
      }
    } else {
      booking = await createWorkerBooking(payload);
    }

    const emailData = {
      email: payload.email,
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
    };

    const emailStatus = await sendBookingEmails(emailData);
    await recordEmailStatus(booking.id, emailStatus, "booking_created");

    refreshAdminData();
    return { success: true, bookingId: booking.id, emailStatus };
  } catch (error) {
    console.error("Failed storing booking:", error);
    return { success: false, error: error.message || "System failed to save booking right now." };
  }
}

export async function resendBookingEmails(booking) {
  try {
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
        console.error("Failed updating abandoned lead, creating a fresh abandoned lead instead:", error);
        booking = await createWorkerBooking(createPayload);
      }

      refreshAdminData();
      return { success: true, bookingId: booking.id };
    }

    const booking = await createWorkerBooking(createPayload);

    refreshAdminData();
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed capturing abandoned lead:", error);
    return { success: false };
  }
}
