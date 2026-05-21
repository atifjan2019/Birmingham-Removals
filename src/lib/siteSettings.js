import { getWorkerSettings } from "@/lib/workerApi";
import { BUSINESS } from "@/config/business";

const FALLBACK = {
  logoUrl: "/images/logo.webp",
  footerLogoUrl: "",
  faviconUrl: "/favicon.ico",
  phone: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  address: `${BUSINESS.address.locality}, ${BUSINESS.address.region}, ${BUSINESS.address.country}`,
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  youtube: "",
  tiktok: "",
  whatsapp: "",
};

// Any data: URL stored historically by the admin upload tool would balloon
// every page to multi-MB and embed base64 in JSON-LD. Drop them so the
// static fallback image is used instead.
function stripDataUrl(value, fallback) {
  if (typeof value !== "string") return fallback;
  if (value.startsWith("data:")) return fallback;
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
    merged.logoUrl = stripDataUrl(merged.logoUrl, FALLBACK.logoUrl);
    merged.footerLogoUrl = stripDataUrl(merged.footerLogoUrl, "");
    merged.faviconUrl = stripDataUrl(merged.faviconUrl, FALLBACK.faviconUrl);
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
