"use server";

import { updateWorkerSettings } from "@/lib/workerApi";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const TEXT_FIELDS = [
  "phone",
  "email",
  "address",
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "youtube",
  "tiktok",
  "whatsapp",
];

const MAX_LOGO_BYTES = 500 * 1024;
const MAX_FAVICON_BYTES = 100 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/x-icon", "image/vnd.microsoft.icon"];

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = token ? await decrypt(token) : null;
  if (!session) throw new Error("Unauthorized");
  return session;
}

async function fileToDataUrl(file, maxBytes, label) {
  if (!file || typeof file === "string" || !file.size) return null;
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`${label}: unsupported file type (${file.type || "unknown"}).`);
  }
  if (file.size > maxBytes) {
    throw new Error(`${label}: file too large (max ${Math.round(maxBytes / 1024)}KB).`);
  }
  const buf = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buf.toString("base64")}`;
}

export async function updateSiteSettings(_prevState, formData) {
  try {
    await requireAdmin();
  } catch {
    return { error: "Unauthorized." };
  }

  try {
    const patch = {};

    for (const f of TEXT_FIELDS) {
      const v = formData.get(f);
      if (v != null) patch[f] = String(v).trim();
    }

    const logoFile = formData.get("logo");
    const faviconFile = formData.get("favicon");

    const logoData = await fileToDataUrl(logoFile, MAX_LOGO_BYTES, "Logo");
    if (logoData) patch.logoUrl = logoData;

    const faviconData = await fileToDataUrl(faviconFile, MAX_FAVICON_BYTES, "Favicon");
    if (faviconData) patch.faviconUrl = faviconData;

    if (formData.get("removeLogo") === "1") patch.logoUrl = null;
    if (formData.get("removeFavicon") === "1") patch.faviconUrl = null;

    await updateWorkerSettings(patch);

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");

    return { success: true, savedAt: Date.now() };
  } catch (e) {
    return { error: e?.message || "Failed to save settings." };
  }
}
