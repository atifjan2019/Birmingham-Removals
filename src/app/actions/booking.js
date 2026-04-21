"use server";

import { calculateQuote } from "@/lib/quoteCalculator";
import { revalidatePath } from "next/cache";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email";
import {
  createWorkerBooking,
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

export async function createBooking(formData) {
  try {
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

    const booking = await createWorkerBooking({
      fullName,
      phone,
      email,
      moveType,
      fromPostcode,
      toPostcode,
      moveDate,
      bedrooms: parseInt(bedrooms) || 0,
      extras: extras || [],
      status: status || "New",
      price: estimatedPrice,
    });

    const emailData = {
      email,
      fullName,
      phone,
      moveType,
      fromPostcode,
      toPostcode,
      moveDate,
      bedrooms: parseInt(bedrooms) || 0,
      extras: extras || [],
      estimatedPrice,
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

    const booking = await createWorkerBooking({
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
    });

    refreshAdminData();
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed capturing abandoned lead:", error);
    return { success: false };
  }
}
