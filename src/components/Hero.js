"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  MapPin,
  Shield,
  Star,
  CheckCircle2,
  Clock,
  Truck,
} from "lucide-react";

const trustPoints = [
  "Fully insured moves",
  "DBS-checked crews",
  "Free quote in 30 minutes",
  "5-star Google reviews",
];

const floatingStats = [
  { icon: Star, value: "4.9", label: "Google Rating", sub: "312+ reviews" },
  { icon: Truck, value: "5,200+", label: "Moves Delivered", sub: "since 2015" },
  { icon: Clock, value: "Same-day", label: "Availability", sub: "West Midlands" },
];

export default function Hero({ onOpenQuote }) {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isRouting, setIsRouting] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isRouting) return;

    setIsRouting(true);
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const query = params.toString();
    router.push(query ? `/quote?${query}` : "/quote");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0E2E50] to-[#0A2540] text-white">
      {/* Decorative background */}
      <div className="hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FF6B35]/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]"></span>
              </span>
              Taking bookings for this weekend
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight mt-5"
            >
              Birmingham&apos;s
              <br />
              <span className="text-[#FF6B35]">stress-free</span> removals company
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 text-lg text-white/75 max-w-xl"
            >
              House moves, office relocations, man &amp; van and packing across Birmingham,
              Solihull, Sutton Coldfield and the wider West Midlands. Fixed prices, fully
              insured, zero surprises.
            </motion.p>

            {/* Quick-quote postcode widget */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={onSubmit}
              className="mt-8 bg-white rounded-2xl p-3 shadow-2xl shadow-black/30 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2"
            >
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#FF6B35] transition-colors">
                <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">From</span>
                  <input
                    type="text"
                    placeholder="e.g. B15 3AA"
                    value={from}
                    onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    className="w-full bg-transparent text-[#0A2540] font-semibold text-base focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#FF6B35] transition-colors">
                <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">To</span>
                  <input
                    type="text"
                    placeholder="e.g. B91 1AA"
                    value={to}
                    onChange={(e) => setTo(e.target.value.toUpperCase())}
                    className="w-full bg-transparent text-[#0A2540] font-semibold text-base focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
              <button
                type="submit"
                disabled={isRouting}
                aria-busy={isRouting}
                className={`btn-accent relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl min-h-[56px] ${
                  isRouting ? "cursor-wait shadow-[0_0_0_4px_rgba(255,107,53,0.18)]" : ""
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
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustPoints.map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT stats cards */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop"
                  alt="Birmingham Removals team at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-transparent to-transparent" />

                {/* Floating card: 4.9 rating */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-1 text-[#FF6B35] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-[#0A2540] font-bold text-xl">4.9 out of 5</div>
                  <div className="text-slate-500 text-xs">from 312 Google reviews</div>
                </div>

                {/* Floating card: insured */}
                <div className="absolute bottom-6 right-6 bg-[#0A2540] text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#FF6B35]" />
                  <div>
                    <div className="font-bold text-base">£10m insured</div>
                    <div className="text-white/60 text-xs">Goods in transit</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Inline stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl"
        >
          {floatingStats.map((s) => (
            <div
              key={s.label}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/15 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <div className="min-w-0">
                <div className="font-[family-name:var(--font-space)] font-bold text-lg leading-none">{s.value}</div>
                <div className="text-xs text-white/70 mt-1 leading-tight">{s.label}</div>
                <div className="text-[10px] text-white/50 leading-tight">{s.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
