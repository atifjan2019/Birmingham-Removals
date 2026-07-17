// Loads the Google Maps JavaScript API (with the Places library) exactly once
// and hands back the shared `window.google` namespace. Safe to call from any
// client component — concurrent callers share a single script tag / promise.
//
// The key is a browser-side key (Maps JS always exposes it), so it MUST be
// restricted by HTTP referrer in the Google Cloud console. It is read from
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (set it in .env.local for dev and in the
// Vercel project env for production). If it is unset the loader no-ops and the
// postcode fields degrade to plain text inputs.
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

let loadPromise = null;

export function loadGoogleMaps() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!GOOGLE_MAPS_API_KEY) return Promise.resolve(null);
  if (window.google?.maps?.places) return Promise.resolve(window.google);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("google-maps-js");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return loadPromise;
}
