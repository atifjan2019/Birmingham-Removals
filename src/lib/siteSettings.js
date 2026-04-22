import { getWorkerSettings } from "@/lib/workerApi";

const FALLBACK = {
  logoUrl: "/images/logo.png",
  faviconUrl: "/favicon.ico",
  phone: "07365 380090",
  email: "info@birminghamremovals.uk",
  address: "Birmingham, West Midlands, UK",
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  youtube: "",
  tiktok: "",
  whatsapp: "",
};

export async function getSiteSettings() {
  try {
    const row = await getWorkerSettings();
    if (!row) return { ...FALLBACK };
    const merged = { ...FALLBACK };
    for (const k of Object.keys(FALLBACK)) {
      if (row[k] != null && String(row[k]).length > 0) merged[k] = row[k];
    }
    return merged;
  } catch (e) {
    console.error("[siteSettings] read failed, using fallback:", e?.message);
    return { ...FALLBACK };
  }
}

export const SITE_SETTINGS_FALLBACK = FALLBACK;
