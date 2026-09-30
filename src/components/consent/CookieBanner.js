"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CONSENT_SETTINGS_EVENT,
  REOPENED,
  applyConsent,
  enforceStoredConsent,
  isPrivatePath,
  readConsent,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * The cookie question, shown while the visitor has not answered. The answer
 * lives in a cookie, read in the browser only (the server renders nothing
 * here), so a visitor who has already answered never sees it flash. It is a
 * plain region, not a dialog: it does not trap focus or cover the page, and
 * the site works while it is open. Accept and Decline are the same size and
 * weight, side by side, because an unequal way to say no is not valid consent.
 * It sits above the phone bar at the foot of the home page on mobile (see
 * --sticky-cta-h in globals.css).
 */
export default function CookieBanner() {
  const pathname = usePathname();
  const answer = useSyncExternalStore(subscribeConsent, readConsent, () => "not read");
  const visible = answer === null;
  const acceptRef = useRef(null);
  const region = useRef(null);
  const shown = visible && !isPrivatePath(pathname);
  // Focus moves to the banner only when it is reopened from Cookie settings,
  // never when a visitor first arrives and is trying to read the page. `opener`
  // is the control that reopened it, where focus goes back after the answer.
  const focusOnOpen = useRef(false);
  const opener = useRef(null);

  useEffect(() => {
    // Anything the tools left on the device without a current yes goes.
    enforceStoredConsent();
    // Reopened by taking back a yes, which reloads the page (openCookieSettings).
    try {
      if (window.sessionStorage.getItem(REOPENED)) {
        window.sessionStorage.removeItem(REOPENED);
        focusOnOpen.current = true;
      }
    } catch {
      // Storage blocked: the banner still shows, focus just stays put.
    }
    const reopen = () => {
      focusOnOpen.current = true;
      opener.current = document.activeElement;
      // Already showing (never answered): focus now rather than on the next render.
      acceptRef.current?.focus();
    };
    window.addEventListener(CONSENT_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, reopen);
  }, []);

  // While it shows, the page gets room at the bottom (globals.css) so its
  // last content, the quote form's Continue button say, can be scrolled clear
  // of the banner rather than sitting under it until the question is answered.
  useEffect(() => {
    const root = document.documentElement;
    const box = region.current;
    if (!shown || !box) {
      root.style.setProperty("--cookie-banner-h", "0px");
      return undefined;
    }
    const publish = () => root.style.setProperty("--cookie-banner-h", `${box.offsetHeight + 24}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(box);
    return () => {
      observer.disconnect();
      root.style.setProperty("--cookie-banner-h", "0px");
    };
  }, [shown]);

  useEffect(() => {
    if (visible && focusOnOpen.current) {
      focusOnOpen.current = false;
      acceptRef.current?.focus();
    }
  }, [visible]);

  if (!shown) return null;

  const choose = (choice, event) => {
    // A keyboard press (detail 0) needs somewhere to land; a mouse click must
    // leave the page where it was.
    const fromKeyboard = event.detail === 0;
    writeConsent(choice);
    applyConsent(choice);
    if (fromKeyboard) {
      const back = opener.current?.isConnected ? opener.current : document.getElementById("cookie-settings");
      if (back) back.focus();
      else {
        // A page with no footer (the quote form): the start of its content.
        const main = document.getElementById("main-content");
        main?.setAttribute("tabindex", "-1");
        main?.focus({ preventScroll: true });
      }
    }
  };

  return (
    <div
      ref={region}
      role="region"
      aria-label="Cookie consent"
      className="cookie-banner fixed inset-x-3 z-50 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(11,30,63,0.18)] sm:p-5 lg:left-auto lg:right-6 lg:mx-0 lg:max-w-sm"
    >
      <p id="cookie-question" className="text-sm leading-relaxed text-slate-700">
        We use Google Analytics and Smartlook to see how the site is used and what is hard to use. Accept and
        they set cookies; decline and neither is used.{" "}
        <Link href="/cookies" className="font-semibold text-[#0B1E3F] underline underline-offset-4">
          About cookies
        </Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <button
          ref={acceptRef}
          type="button"
          aria-describedby="cookie-question"
          onClick={(e) => choose("granted", e)}
          className="rounded-xl border-2 border-[#0B1E3F] bg-white px-4 py-2.5 text-sm font-bold text-[#0B1E3F] transition-colors hover:bg-slate-50"
        >
          Accept
        </button>
        <button
          type="button"
          aria-describedby="cookie-question"
          onClick={(e) => choose("denied", e)}
          className="rounded-xl border-2 border-[#0B1E3F] bg-white px-4 py-2.5 text-sm font-bold text-[#0B1E3F] transition-colors hover:bg-slate-50"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
