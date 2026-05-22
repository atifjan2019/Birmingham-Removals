import Image from "next/image";
import {
  Shield,
  Star,
  CheckCircle2,
  Clock,
  Truck,
} from "lucide-react";
import HeroQuoteForm from "@/components/HeroQuoteForm";

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

// Server component. The headline is the mobile LCP element, so it is rendered
// as static HTML with no entrance animation and no client JS dependency.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3F] via-[#0E2E50] to-[#0B1E3F] text-white">
      {/* Decorative background */}
      <div className="hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#F97316]/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F97316]"></span>
              </span>
              Taking bookings for this weekend
            </div>

            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight mt-5">
              Birmingham&apos;s{" "}
              <span className="text-[#F97316]">stress-free</span> removals company
            </h1>

            <p className="mt-5 text-lg text-white/75 max-w-xl">
              House moves, office relocations, man &amp; van and packing across Birmingham,
              Solihull, Sutton Coldfield and the wider West Midlands. Fixed prices, fully
              insured, zero surprises.
            </p>

            {/* Quick-quote postcode widget (client island) */}
            <HeroQuoteForm />

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {trustPoints.map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT stats cards (desktop only, not rendered/painted on mobile) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/hero-birmingham.jpg"
                  alt="Birmingham removals team loading a van"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 40vw, 1px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3F]/70 via-transparent to-transparent" />

                {/* Floating card: 4.9 rating */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-1 text-[#F97316] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-[#0B1E3F] font-bold text-xl">4.9 out of 5</div>
                  <div className="text-slate-500 text-xs">from 312 Google reviews</div>
                </div>

                {/* Floating card: insured */}
                <div className="absolute bottom-6 right-6 bg-[#0B1E3F] text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#F97316]" />
                  <div>
                    <div className="font-bold text-base">£10m insured</div>
                    <div className="text-white/60 text-xs">Goods in transit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline stat strip */}
        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl">
          {floatingStats.map((s) => (
            <div
              key={s.label}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-[#F97316]" />
              </div>
              <div className="min-w-0">
                <div className="font-[family-name:var(--font-space)] font-bold text-lg leading-none">{s.value}</div>
                <div className="text-xs text-white/70 mt-1 leading-tight">{s.label}</div>
                <div className="text-[10px] text-white/70 leading-tight">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
