"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/config/business";
import { CONSENT_GRANTED_EVENT, isPrivatePath, readConsent } from "@/lib/consent";

// Smartlook's project key, as it was in the layout before consent.
const SMARTLOOK_KEY = "46b85b47fc8859eeb693f5a26240894d74e9edd7";

// Whether this page has loaded either tool. Once loaded they stay for the life
// of the page, whatever address the site's own navigation moves it to.
const toolsLoaded = () => Boolean(document.getElementById("ga-src") || typeof window.smartlook === "function");

// Puts Google Analytics and the Smartlook recorder on the page, once each per
// page load however often it is called, and only on the live site: a preview
// or a local build sends nothing, so test visits never reach the reports.
function loadTools() {
  if (location.hostname !== new URL(BUSINESS.url).hostname) return;

  if (BUSINESS.gaMeasurementId && !document.getElementById("ga-src")) {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
    // The consent defaults are declared in <head> (ConsentDefault), but a page
    // React put together in the browser, such as a "not found" page, never runs
    // that script. Declared here too when missing, before anything is measured:
    // the advertising signals stay denied, and analytics is what was accepted.
    const declared = window.dataLayer.some((entry) => entry?.[0] === "consent" && entry?.[1] === "default");
    if (!declared) {
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
      });
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    window.gtag("js", new Date());
    // Later pages are counted by Analytics itself as the address changes
    // (enhanced measurement), so one config is all it needs.
    window.gtag("config", BUSINESS.gaMeasurementId);
    const script = document.createElement("script");
    script.id = "ga-src";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${BUSINESS.gaMeasurementId}`;
    document.head.appendChild(script);
  }

  if (typeof window.smartlook !== "function") {
    const sl = function smartlook() {
      sl.api.push(arguments);
    };
    sl.api = [];
    window.smartlook = sl;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://web-sdk.smartlook.com/recorder.js";
    document.head.appendChild(script);
    window.smartlook("init", SMARTLOOK_KEY, { region: "eu" });
  }
}

/**
 * Google Analytics and Smartlook, loaded only once the visitor has accepted.
 * Until then nothing is requested from either, so a visitor who declines or
 * never answers is in no contact with them (Google's "basic" consent mode).
 * Accepting takes effect on the page already open. Never on the admin or on a
 * customer's move details page (see isPrivatePath).
 */
export default function AnalyticsLoader() {
  const blocked = isPrivatePath(usePathname());

  // Back or Forward within the site onto a private page, on a page that has
  // loaded the tools, becomes a full load of that page, which never has them:
  // the recorder must not be running while a private address is on screen.
  // In the capture phase, so it acts before the site's router shows the page.
  useEffect(() => {
    const guard = (event) => {
      if (!isPrivatePath(location.pathname) || !toolsLoaded()) return;
      event.stopImmediatePropagation();
      location.reload();
    };
    window.addEventListener("popstate", guard, true);
    return () => window.removeEventListener("popstate", guard, true);
  }, []);

  useEffect(() => {
    // Google's own switch for a page already carrying Analytics: while it is
    // on, nothing is sent, so an address with an enquiry's key in it cannot
    // reach Google even after a move within the site. (Private pages are
    // reached by a full page load today, which never loads the tools.)
    if (BUSINESS.gaMeasurementId) window[`ga-disable-${BUSINESS.gaMeasurementId}`] = blocked;
    // Any other way onto a private page with the tools loaded: the same full load.
    if (blocked && toolsLoaded()) {
      location.reload();
      return undefined;
    }
    if (blocked) return undefined;
    if (readConsent() === "granted") loadTools();
    window.addEventListener(CONSENT_GRANTED_EVENT, loadTools);
    return () => window.removeEventListener(CONSENT_GRANTED_EVENT, loadTools);
  }, [blocked]);

  return null;
}
