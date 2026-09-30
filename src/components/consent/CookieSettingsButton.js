"use client";

import { openCookieSettings } from "@/lib/consent";

/**
 * The way to change or withdraw a cookie answer, in the footer of every page:
 * as easy to find as the question was to answer. A button, not a link, because
 * it acts on the page it is on. The footer's copy carries the id the banner
 * returns keyboard focus to.
 */
export default function CookieSettingsButton({
  id,
  className = "text-white/60 text-xs underline-offset-4 hover:text-white hover:underline",
}) {
  return (
    <button id={id} type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
