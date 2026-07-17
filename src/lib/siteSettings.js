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
  // No default contact email: when the admin clears it, it stays empty and is
  // hidden everywhere (navbar, footer, contact page, schema, emails) rather
  // than reverting to a hardcoded address.
  email: "",
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
  // Master toggle for showing the business phone number across the public site
  // (navbar, footer, CTAs, contact & quote pages). Controlled from
  // /admin/settings. Stored in D1 as "1"/"0"; defaults to shown.
  showPhone: true,
};

// Logos uploaded via the admin panel are stored inline as base64 data URLs in
// D1 (~530 KB combined for logo + footer logo + favicon). They must NEVER be
// passed through to page markup: each embedded copy is duplicated into every
// page's HTML and RSC payload, which pushed pages to ~3.4 MB apiece and
// multiplied Vercel ISR write units ~6× across all ~230 pages. Instead pages
// get a tiny URL to /api/site-image/[kind], which decodes and serves the
// image from the same shared, cached settings fetch. The ?v= param (the
// settings row's updatedAt) busts CDN/browser caches when an admin uploads a
// new image, so the route can serve with immutable cache headers.
function toImageRoute(value, kind, version, fallback) {
  if (typeof value !== "string" || value.length === 0) return fallback;
  if (!value.startsWith("data:")) return value; // already a plain URL/path
  return `/api/site-image/${kind}?v=${encodeURIComponent(version)}`;
}

export async function getSiteSettings() {
  try {
    const row = await getWorkerSettings();
    if (!row) return { ...FALLBACK };
    const merged = { ...FALLBACK };
    for (const k of Object.keys(FALLBACK)) {
      if (k === "showPhone") continue; // boolean flag, coerced below
      if (row[k] != null && String(row[k]).length > 0) merged[k] = row[k];
    }
    // Stored as a string ("0"/"1"). Only an explicit "0" hides the phone; any
    // other value (including a missing column on older DBs) keeps it shown.
    merged.showPhone = String(row.showPhone) !== "0";
    const version = row.updatedAt || "";
    merged.logoUrl = toImageRoute(merged.logoUrl, "logo", version, FALLBACK.logoUrl);
    merged.footerLogoUrl = toImageRoute(merged.footerLogoUrl, "footer-logo", version, "");
    merged.faviconUrl = toImageRoute(merged.faviconUrl, "favicon", version, FALLBACK.faviconUrl);
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
