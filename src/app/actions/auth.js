"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const ADMIN_PIN = process.env.ADMIN_PIN || "524862";

export async function loginAsAdmin(prevState, formData) {
  const pin = String(formData.get("pin") || "").trim();

  if (!pin) {
    return { error: "Please enter the admin PIN." };
  }

  if (pin !== ADMIN_PIN) {
    return { error: "Invalid PIN." };
  }

  await createSession("pin-admin");
  redirect("/admin");
}

export async function logoutAdmin() {
  await deleteSession();
  redirect("/admin/login");
}
