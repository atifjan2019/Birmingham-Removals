"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { SITE_SETTINGS_FALLBACK, telHref } from "@/lib/siteSettings";

export default function StickyMobileCTA({ onOpenQuote, settings }) {
  const s = { ...SITE_SETTINGS_FALLBACK, ...(settings || {}) };
  const phoneHref = telHref(s.phone);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-3 mb-3 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-[0_-8px_24px_rgba(11,30,63,0.18)] p-2 flex items-center gap-2">
        <a
          href={phoneHref}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#0B1E3F] text-white font-bold text-sm"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <button
          onClick={onOpenQuote}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#F97316] text-white font-bold text-sm hover:bg-[#EA580C] transition-colors"
        >
          Get Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
