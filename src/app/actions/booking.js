"use server";

import { calculateQuote } from "@/lib/quoteCalculator";
import { revalidatePath } from "next/cache";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email";
import {
  createWorkerBooking,
  listBookings,
  updateWorkerBooking,
  deleteWorkerBooking,
} from "@/lib/workerApi";

function refreshAdminData() {
  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/customers");
  revalidatePath("/admin/reports");
  revalidatePath("/admin/activity");
}

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.startsWith("44") ? `0${digits.slice(2)}` : digits;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isPendingEmail(value) {
  return /^abandoned_\d+@pending\.com$/i.test(String(value || ""));
}

function leadMatchScore(booking, data) {
  const customer = booking.customer || {};
  const email = normalizeEmail(data.email);
  const bookingEmail = normalizeEmail(customer.email);
  const phone = normalizePhone(data.phone);
  const bookingPhone = normalizePhone(customer.phone);

  const emailMatches = email && bookingEmail === email && !isPendingEmail(bookingEmail);
  const phoneMatches = phone && bookingPhone === phone;

  if (!emailMatches && !phoneMatches) return 0;

  let score = 50;
  if (emailMatches && phoneMatches) score += 25;
  if (normalizeEmail(booking.fromPostcode) === normalizeEmail(data.fromPostcode)) score += 5;
  if (normalizeEmail(booking.toPostcode) === normalizeEmail(data.toPostcode)) score += 5;
  if (String(booking.moveDate || "") === String(data.moveDate || "")) score += 5;
  if (String(booking.moveType || "").toLowerCase() === String(data.moveType || "").toLowerCase()) score += 3;
  if (Number(booking.bedrooms) === Number(data.bedrooms)) score += 2;

  return score;
}

async function findMatchingAbandonedBooking(data) {
  if (!data.email && !data.phone) return null;

  try {
    const bookings = await listBookings();
    return bookings
      .filter((booking) => booking.status === "Abandoned")
      .map((booking) => ({ booking, score: leadMatchScore(booking, data) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)[0]?.booking || null;
  } catch (error) {
    console.error("[BOOKING] Failed checking abandoned leads:", error.message);
    return null;
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
    const matchingAbandoned = payload.status !== "Abandoned"
      ? await findMatchingAbandonedBooking(payload)
      : null;

    const booking = matchingAbandoned
      ? await updateWorkerBooking(matchingAbandoned.id, payload)
      : await createWorkerBooking(payload);

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

    try {
      await Promise.all([
        sendBookingConfirmation(emailData),
        sendAdminNotification(emailData),
      ]);
    } catch (emailErr) {
      console.error("[EMAIL] Failed to send:", emailErr.message);
    }

    refreshAdminData();
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed storing booking:", error);
    return { success: false, error: error.message || "System failed to save booking right now." };
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

    const matchingAbandoned = await findMatchingAbandonedBooking(payload);
    const booking = matchingAbandoned
      ? await updateWorkerBooking(matchingAbandoned.id, payload)
      : await createWorkerBooking(payload);

    refreshAdminData();
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed capturing abandoned lead:", error);
    return { success: false };
  }
}
