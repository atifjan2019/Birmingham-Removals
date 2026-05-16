"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, MapPin } from "lucide-react";

// Client island: the only interactive part of the hero. Keeping this isolated
// lets the hero headline (LCP element) render as static server HTML.
export default function HeroQuoteForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routeError, setRouteError] = useState("");
  const [isRouting, setIsRouting] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRouting) return;

    if (!from.trim() || !to.trim()) {
      setRouteError("Please enter both postcodes.");
      return;
    }

    setRouteError("");
    setIsRouting(true);
    const params = new URLSearchParams();
    params.set("from", from.trim());
    params.set("to", to.trim());
    const query = params.toString();
    router.push(query ? `/quote?${query}` : "/quote");
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl p-3 shadow-2xl shadow-black/30 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2"
      >
        <label className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border transition-colors ${
          routeError && !from.trim() ? "border-red-300" : "border-slate-200 focus-within:border-[#F97316]"
        }`}>
          <MapPin className="w-5 h-5 text-[#F97316] shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold">From</span>
            <input
              type="text"
              required
              aria-required="true"
              aria-label="Move-from postcode"
              placeholder="e.g. B15 3AA"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value.toUpperCase());
                setRouteError("");
              }}
              className="w-full bg-transparent text-[#0B1E3F] font-semibold text-base focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </label>
        <label className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border transition-colors ${
          routeError && !to.trim() ? "border-red-300" : "border-slate-200 focus-within:border-[#F97316]"
        }`}>
          <MapPin className="w-5 h-5 text-[#F97316] shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold">To</span>
            <input
              type="text"
              required
              aria-required="true"
              aria-label="Move-to postcode"
              placeholder="e.g. B91 1AA"
              value={to}
              onChange={(e) => {
                setTo(e.target.value.toUpperCase());
                setRouteError("");
              }}
              className="w-full bg-transparent text-[#0B1E3F] font-semibold text-base focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </label>
        <button
          type="submit"
          disabled={isRouting}
          aria-busy={isRouting}
          className={`btn-accent relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl min-h-[56px] ${
            isRouting ? "cursor-wait shadow-[0_0_0_4px_rgba(249, 115, 22,0.18)]" : ""
          }`}
        >
          {isRouting && (
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.18)_40%,rgba(255,255,255,0.55)_50%,rgba(255,255,255,0.18)_60%,transparent_100%)] animate-button-sweep" />
          )}
          <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap">
            {isRouting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Preparing quote...
              </>
            ) : (
              <>
                Get Quote
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </span>
        </button>
      </form>
      {routeError && (
        <p className="mt-2 text-sm font-medium text-red-100" role="alert">
          {routeError}
        </p>
      )}
    </div>
  );
}
