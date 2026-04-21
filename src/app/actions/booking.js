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
    const booking = await createWorkerBooking(payload);

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
    const { moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, fullName, phone, email } = formData;

    if (!email && !phone) return { success: false };

    const estimatedPrice = calculateQuote(moveType || "house", bedrooms || 1, extras || []).min || 0;

    const payload = {
      fullName: fullName || "Partial Lead",
      phone: phone || "",
      email: email || `abandoned_${Date.now()}@pending.com`,
      moveType: moveType || "Unknown",
      fromPostcode: fromPostcode || "Unknown",
      toPostcode: toPostcode || "Unknown",
      moveDate: moveDate || new Date().toISOString().slice(0, 10),
      bedrooms: parseInt(bedrooms) || 0,
      extras: extras || [],
      status: "Abandoned",
      price: estimatedPrice,
    };

    const booking = await createWorkerBooking(payload);

    refreshAdminData();
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed capturing abandoned lead:", error);
    return { success: false };
  }
}
