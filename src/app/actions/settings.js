"use server";

import { updateWorkerSettings, getWorkerSettingsFresh } from "@/lib/workerApi";
import { revalidatePath, revalidateTag } from "next/cache";
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

    // Checkbox: present in the form data only when ticked. Persist as "1"/"0"
    // so an untick is stored explicitly rather than left unchanged.
    patch.showPhone = formData.get("showPhone") != null ? "1" : "0";

    const logoFile = formData.get("logo");
    const footerLogoFile = formData.get("footerLogo");
    const faviconFile = formData.get("favicon");

    const logoData = await fileToDataUrl(logoFile, MAX_LOGO_BYTES, "Logo");
    if (logoData) patch.logoUrl = logoData;

    const footerLogoData = await fileToDataUrl(footerLogoFile, MAX_LOGO_BYTES, "Footer logo");
    if (footerLogoData) patch.footerLogoUrl = footerLogoData;

    const faviconData = await fileToDataUrl(faviconFile, MAX_FAVICON_BYTES, "Favicon");
    if (faviconData) patch.faviconUrl = faviconData;

    if (formData.get("removeLogo") === "1") patch.logoUrl = null;
    if (formData.get("removeFooterLogo") === "1") patch.footerLogoUrl = null;
    if (formData.get("removeFavicon") === "1") patch.faviconUrl = null;

    // Snapshot what's stored BEFORE writing, so we can tell whether this save
    // actually changes anything. Settings render in the navbar/footer of every
    // page, so a real change must purge the whole site — but that purge makes
    // every one of the ~230 public pages regenerate (and re-write to Vercel's
    // ISR cache) on its next hit. Skipping it for no-op saves (admin clicks
    // Save without editing, double submits, re-uploads the identical file)
    // avoids full-site regeneration cycles that cost thousands of ISR write
    // units each. If the pre-read fails we assume "changed" — correctness
    // beats saving writes.
    const current = await getWorkerSettingsFresh().catch(() => null);

    await updateWorkerSettings(patch);

    const norm = (v) => (v == null ? "" : String(v));
    const changed =
      !current ||
      Object.keys(patch).some((k) => norm(patch[k]) !== norm(current[k]));

    if (changed) {
      // Bust the single shared settings fetch (used by every page and by
      // /api/site-image/*) first, then mark every page stale. Pages regenerate
      // lazily on their next request — with images no longer inlined this
      // costs ~10 write units per page instead of ~420.
      revalidateTag("site-settings");
      revalidatePath("/", "layout");
    }
    revalidatePath("/admin/settings");

    return { success: true, savedAt: Date.now() };
  } catch (e) {
    return { error: e?.message || "Failed to save settings." };
  }
}
