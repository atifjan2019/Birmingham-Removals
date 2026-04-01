"use server";

import prisma from "@/lib/prisma";
import { calculateQuote } from "@/lib/quoteCalculator";
import { revalidatePath } from "next/cache";

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

    const booking = await prisma.booking.create({
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

    fs.appendFileSync('booking.log', `[BOOKING RECORDED SUCCESSFULLY]: ${booking.id}\n`);

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

