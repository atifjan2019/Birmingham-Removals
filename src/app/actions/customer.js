"use server";

import { revalidatePath } from "next/cache";
import { deleteWorkerCustomer } from "@/lib/workerApi";

export async function deleteCustomer(id) {
  try {
    await deleteWorkerCustomer(id);

    revalidatePath("/admin");
    revalidatePath("/admin/customers");
    revalidatePath("/admin/bookings");
    revalidatePath("/admin/activity");
    revalidatePath("/admin/reports");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: error.message || "Failed to delete customer." };
  }
}
