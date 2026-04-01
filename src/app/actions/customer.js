"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCustomer(id) {
  try {
    // Delete all bookings associated with the customer first to avoid orphaned records / foreign key constraint errors
    await prisma.booking.deleteMany({
      where: { customerId: id }
    });

    // Delete the actual customer
    await prisma.customer.delete({
      where: { id }
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
