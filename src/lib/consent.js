// Cookie consent for the site's two measuring tools: Google Analytics and the
// Smartlook session recorder. Neither is on a page until the visitor accepts
// (see AnalyticsLoader), so a visitor who declines, or never answers, is in no
// contact with either. Ported from the TN Mobile Tyre Fitting site.

export const CONSENT_COOKIE = "br_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182; // six months, then asked again

/** Fired on the window when the footer control asks for the banner back. */
export const CONSENT_SETTINGS_EVENT = "br:cookie-settings";

/** Session storage flag: the banner was reopened by taking back a yes, which reloads the page. */
export const REOPENED = "br_cookie_reopened";

/** Fired on the window the moment consent is given, so the tools load on the page already open. */
export const CONSENT_GRANTED_EVENT = "br:consent-granted";

/** Fired on the window whenever the stored answer is written or cleared. */
const CONSENT_CHANGE_EVENT = "br:consent-change";

/** For useSyncExternalStore: calls back whenever the stored answer changes. */
export function subscribeConsent(callback) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

// Pages the tools never load on, and the banner is never shown on: the admin,
// and a customer's move details page, whose address holds the key to their
// enquiry and must not be sent to Google or Smartlook.
const PRIVATE_PATH = /^\/(admin|move-details)(\/|$)/;

export function isPrivatePath(pathname) {
  return PRIVATE_PATH.test(pathname || "");
}

/** "granted", "denied", or null when the visitor has not answered (or the cookie is unreadable). */
export function readConsent() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!match) return null;
  let value;
  try {
    value = decodeURIComponent(match[1]);
  } catch {
    return null;
  }
  return value === "granted" || value === "denied" ? value : null;
}

export function writeConsent(choice) {
  document.cookie = [
    `${CONSENT_COOKIE}=${choice}`,
    "path=/",
    `max-age=${CONSENT_MAX_AGE}`,
    "samesite=lax",
    location.protocol === "https:" ? "secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function clearConsent() {
  document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0; samesite=lax`;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

// Every domain a cookie on this host could have been written under: Google
// Analytics writes on the registrable domain, and a delete that names no
// domain only matches a cookie written for the host itself.
function cookieScopes() {
  const labels = location.hostname.split(".");
  const scopes = [location.hostname, `.${location.hostname}`];
  for (let i = 1; i <= labels.length - 2; i += 1) {
    const parent = labels.slice(i).join(".");
    scopes.push(parent, `.${parent}`);
  }
  return scopes;
}

/** Removes what the two tools leave on the device: Google's _ga cookies, and Smartlook's SL_ cookies and storage. */
function clearMeasurementData() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name.startsWith("SL_"));
  for (const name of names) {
    for (const domain of cookieScopes()) document.cookie = `${name}=; path=/; max-age=0; domain=${domain}`;
    document.cookie = `${name}=; path=/; max-age=0`;
  }
  try {
    for (const key of Object.keys(window.localStorage)) if (key.startsWith("SL_")) window.localStorage.removeItem(key);
  } catch {
    // Storage blocked: there is nothing of Smartlook's in it either.
  }
}

/** Tells Google Analytics the answer (if it is loaded), and loads or clears accordingly. */
export function applyConsent(choice) {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", { analytics_storage: choice });
  if (choice === "denied") clearMeasurementData();
  if (choice === "granted") window.dispatchEvent(new Event(CONSENT_GRANTED_EVENT));
}

/**
 * Brings the device into line with the stored answer on every page load:
 * anything the tools left behind without a current "yes" is removed.
 */
export function enforceStoredConsent() {
  if (typeof document === "undefined") return;
  if (readConsent() === "granted") return;
  clearMeasurementData();
}

/**
 * The footer's "Cookie settings". Withdrawing has to withdraw: the answer is
 * forgotten, what the tools stored is cleared, and a page that had loaded
 * them is reloaded so they are gone from it too. The banner then asks again.
 */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  const wasGranted = readConsent() === "granted";
  applyConsent("denied");
  if (wasGranted) {
    clearConsent();
    try {
      window.sessionStorage.setItem(REOPENED, "1");
    } catch {
      // Storage blocked: the banner still asks again, without taking focus.
    }
    location.reload();
    return;
  }
  // The banner hears this first, so it knows to take focus when it appears.
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
  clearConsent();
}
