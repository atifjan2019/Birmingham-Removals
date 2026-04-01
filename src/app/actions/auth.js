"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAsAdmin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!adminUser) {
      return { error: "Invalid email or password." };
    }

    const isValidPassword = await bcrypt.compare(password, adminUser.password);

    if (!isValidPassword) {
      return { error: "Invalid email or password." };
    }

    // Passwords match -> Create Session
    await createSession(adminUser.id);
  } catch (err) {
    console.error("Login exception:", err);
    return { error: "An error occurred during login. Please try again." };
  }

  // Redirect to dashboard (this must be outside try block per Nextjs rules)
  redirect("/admin");
}

export async function logoutAdmin() {
  await deleteSession();
  redirect("/admin/login");
}
