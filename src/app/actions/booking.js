"use server";

import prisma from "@/lib/prisma";
import { calculateQuote } from "@/lib/quoteCalculator";
import { revalidatePath } from "next/cache";
import { logActivity } from "./activityLog";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email";

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
      email 
    } = formData;

    const fs = require('fs');
    fs.appendFileSync('booking.log', `[SERVER ACTION CALLED]: ${JSON.stringify(formData)}\n`);

    // Retrieve or create the customer based on email
    let customer = await prisma.customer.findFirst({
      where: { email: email.toLowerCase() }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName,
          phone,
          email: email.toLowerCase()
        }
      });
      fs.appendFileSync('booking.log', `[CUSTOMER CREATED]: ${customer.id}\n`);
    }

    // Get calculated estimated price
    const quote = calculateQuote(moveType, bedrooms || 1, extras || []);
    // Storing as a simple average or minimum for reference
    const estimatedPrice = quote.min;

    // Check if there's an existing Abandoned booking for this customer — upgrade it instead of duplicating
    const existingAbandoned = await prisma.booking.findFirst({
      where: { customerId: customer.id, status: "Abandoned" },
      orderBy: { createdAt: "desc" }
    });

    let booking;
    if (existingAbandoned) {
      // Upgrade the abandoned lead to a real booking
      booking = await prisma.booking.update({
        where: { id: existingAbandoned.id },
        data: {
          moveType,
          fromPostcode,
          toPostcode,
          moveDate: new Date(moveDate),
          bedrooms: parseInt(bedrooms) || 0,
          extras: extras || [],
          status: "New",
          price: estimatedPrice
        }
      });
    } else {
      booking = await prisma.booking.create({
        data: {
          customerId: customer.id,
          moveType,
          fromPostcode,
          toPostcode,
          moveDate: new Date(moveDate),
          bedrooms: parseInt(bedrooms) || 0,
          extras: extras || [],
          status: "New",
          price: estimatedPrice
        }
      });
    }

    fs.appendFileSync('booking.log', `[BOOKING RECORDED SUCCESSFULLY]: ${booking.id}\n`);

    await logActivity({
      action: "booking.created",
      details: JSON.stringify({
        summary: `New booking from ${fullName}`,
        customer: { fullName, phone, email },
        moveType,
        bedrooms: parseInt(bedrooms) || 0,
        fromPostcode,
        toPostcode,
        moveDate,
        extras: extras || [],
        estimatedPrice,
      }),
      entityId: booking.id,
      actor: "customer",
    });

    // Send emails (fire-and-forget, don't block the response)
    const emailData = { email, fullName, phone, moveType, fromPostcode, toPostcode, moveDate, bedrooms: parseInt(bedrooms) || 0, extras: extras || [], estimatedPrice, bookingId: booking.id };
    sendBookingConfirmation(emailData).catch(err => console.error("[EMAIL] Customer confirmation failed:", err.message));
    sendAdminNotification(emailData).catch(err => console.error("[EMAIL] Admin notification failed:", err.message));

    // Revalidate admin pages to show new data immediately
    revalidatePath("/admin/bookings");
    revalidatePath("/admin");

    return { success: true, bookingId: booking.id };
  } catch (error) {
    const fs = require('fs');
    fs.appendFileSync('booking.log', `[ERROR]: ${error.message}\n${error.stack}\n`);
    console.error("Failed storing booking:", error);
    return { success: false, error: error.message || "System failed to save booking right now." };
  }
}

export async function updateBookingStatus(id, status) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true },
    });

    await prisma.booking.update({
      where: { id },
      data: { status }
    });

    await logActivity({
      action: "booking.status_updated",
      details: JSON.stringify({
        summary: `Status changed to "${status}"`,
        previousStatus: booking?.status,
        newStatus: status,
        customer: booking?.customer?.fullName || "Unknown",
        route: `${booking?.fromPostcode} → ${booking?.toPostcode}`,
        moveType: booking?.moveType,
      }),
      entityId: id,
      actor: "admin",
    });

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("Failed updating booking:", error);
    return { success: false, error: "Failed to update booking status." };
  }
}

export async function updateBookingFinancials(id, jobCost, expenses) {
  try {
    const profit = (jobCost || 0) - (expenses || 0);
    await prisma.booking.update({
      where: { id },
      data: {
        jobCost: parseFloat(jobCost) || 0,
        expenses: parseFloat(expenses) || 0,
        profit: parseFloat(profit) || 0
      }
    });
    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("Failed updating financials:", error);
    return { success: false, error: "Failed to update financials." };
  }
}

export async function deleteBooking(id) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true },
    });

    await prisma.booking.delete({
      where: { id }
    });

    await logActivity({
      action: "booking.deleted",
      details: JSON.stringify({
        summary: `Booking permanently deleted`,
        customer: booking?.customer?.fullName || "Unknown",
        route: `${booking?.fromPostcode} → ${booking?.toPostcode}`,
        moveType: booking?.moveType,
        moveDate: booking?.moveDate,
      }),
      entityId: id,
      actor: "admin",
    });

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("Failed deleting booking:", error);
    return { success: false, error: "Failed to delete booking." };
  }
}

export async function captureAbandonedLead(formData) {
  try {
    const { moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, fullName, phone, email } = formData;
    
    if (!email && !phone) return { success: false }; // Need at least some contact info

    // Find or create customer
    let customer = null;
    if (email) {
      customer = await prisma.customer.findFirst({ where: { email: email.toLowerCase() } });
    }
    if (!customer && phone) {
      customer = await prisma.customer.findFirst({ where: { phone } });
    }

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName: fullName || "Partial Lead",
          phone: phone || "",
          email: email ? email.toLowerCase() : `abandoned_${Date.now()}@pending.com`
        }
      });
    }

    const estimatedPrice = calculateQuote(moveType || "house", bedrooms || 1, extras || []).min || 0;

    // Check if an abandoned booking already exists for this exact trip today to prevent spam
    const existing = await prisma.booking.findFirst({
      where: { customerId: customer.id, status: "Abandoned" },
      orderBy: { createdAt: "desc" }
    });

    if (existing) {
      // Just update it
      await prisma.booking.update({
        where: { id: existing.id },
        data: {
          moveType, fromPostcode, toPostcode, 
          moveDate: moveDate ? new Date(moveDate) : new Date(),
          bedrooms: parseInt(bedrooms) || 0,
          price: estimatedPrice
        }
      });
      return { success: true, bookingId: existing.id };
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        moveType: moveType || "Unknown",
        fromPostcode: fromPostcode || "Unknown",
        toPostcode: toPostcode || "Unknown",
        moveDate: moveDate ? new Date(moveDate) : new Date(),
        bedrooms: parseInt(bedrooms) || 0,
        extras: extras || [],
        status: "Abandoned",
        price: estimatedPrice
      }
    });

    await logActivity({
      action: "lead.abandoned_captured",
      details: `Abandoned lead captured — ${moveType || "unknown"} move`,
      entityId: booking.id,
      actor: "system",
    });

    revalidatePath("/admin/bookings");
    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Failed capturing abandoned lead:", error);
    return { success: false };
  }
}

