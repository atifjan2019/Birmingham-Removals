"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { deleteWorkerCustomer } from "@/lib/workerApi";

// A server action can be called by anyone who can reach the site, from any
// page, so the login on the /admin pages does not cover it: the action checks
// the session itself. This one deletes a customer and every booking they have.
async function isAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const session = token ? await decrypt(token) : null;
    return Boolean(session?.userId);
  } catch {
    return false;
  }
}

export async function deleteCustomer(id) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
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
