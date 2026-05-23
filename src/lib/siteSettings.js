import { getWorkerSettings } from "@/lib/workerApi";
import { BUSINESS } from "@/config/business";

const FALLBACK = {
  // Empty defaults trigger the text-based logo fallback in Navbar/Footer when
  // no logo has been uploaded via /admin/settings. A non-empty default that
  // points at a missing file ("/images/logo.webp") would render as a blank box.
  logoUrl: "",
  footerLogoUrl: "",
  faviconUrl: "/favicon.ico",
  phone: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  address: BUSINESS.addressDisplay,
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  youtube: "",
  tiktok: "",
  // Default the WhatsApp URL to the main business phone so the navbar call
  // number and footer/contact WhatsApp number always match. An admin-supplied
  // value in D1 overrides this fallback (some businesses route WhatsApp to a
  // dedicated handset). Without an override, no divergence is possible.
  whatsapp: `https://wa.me/${BUSINESS.phoneE164.replace(/[^\d]/g, "")}`,
};

// Logos uploaded via the admin panel are stored inline as base64 data URLs in
// D1. We allow them to render, but cap their size so a stray oversized upload
// can't balloon every page's HTML. The admin uploader already enforces 500 KB
// per image; this is a defensive backstop for any historical/large value.
// (JSON-LD uses BUSINESS.logo, a static URL, so data URLs never reach schema.)
const MAX_INLINE_IMAGE_CHARS = 800 * 1024; // ~500 KB binary + base64 overhead

function sanitizeImageUrl(value, fallback) {
  if (typeof value !== "string" || value.length === 0) return fallback;
  if (value.startsWith("data:") && value.length > MAX_INLINE_IMAGE_CHARS) {
    return fallback;
  }
  return value;
}

export async function getSiteSettings() {
  try {
    const row = await getWorkerSettings();
    if (!row) return { ...FALLBACK };
    const merged = { ...FALLBACK };
    for (const k of Object.keys(FALLBACK)) {
      if (row[k] != null && String(row[k]).length > 0) merged[k] = row[k];
    }
    merged.logoUrl = sanitizeImageUrl(merged.logoUrl, FALLBACK.logoUrl);
    merged.footerLogoUrl = sanitizeImageUrl(merged.footerLogoUrl, "");
    merged.faviconUrl = sanitizeImageUrl(merged.faviconUrl, FALLBACK.faviconUrl);
    return merged;
  } catch (e) {
    console.error("[siteSettings] read failed, using fallback:", e?.message);
    return { ...FALLBACK };
  }
}

export const SITE_SETTINGS_FALLBACK = FALLBACK;

export function telHref(phone) {
  if (!phone) return BUSINESS.telHref;
  const digits = String(phone).replace(/\D/g, "");
  if (!digits) return BUSINESS.telHref;
  if (digits.startsWith("44")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+44${digits.slice(1)}`;
  return `tel:${digits}`;
}
