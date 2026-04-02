"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "./activityLog";

export async function deleteCustomer(id) {
  try {
    // Fetch customer info before deleting for the activity log
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: { bookings: { select: { id: true } } },
    });

    const bookingCount = customer?.bookings?.length || 0;

    // Delete all bookings associated with the customer first
    await prisma.booking.deleteMany({
      where: { customerId: id }
    });

    // Delete the actual customer
    await prisma.customer.delete({
      where: { id }
    });

    await logActivity({
      action: "customer.deleted",
      details: JSON.stringify({
        summary: `Customer "${customer?.fullName}" deleted`,
        customer: {
          fullName: customer?.fullName,
          phone: customer?.phone,
          email: customer?.email,
        },
        bookingsDeleted: bookingCount,
      }),
      entityId: id,
      actor: "admin",
    });

    revalidatePath("/admin/customers");
    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: "Failed to delete customer." };
  }
}
