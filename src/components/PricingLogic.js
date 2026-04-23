"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BadgePoundSterling,
  Home,
  MapPin,
  Building2,
  Package,
  Calendar,
  Piano,
  Warehouse,
  ArrowRight,
} from "lucide-react";

const factors = [
  {
    icon: Home,
    title: "Property size & inventory",
    desc: "Drives van size and crew size. A studio in Moseley needs less than a 4-bed in Sutton Coldfield.",
  },
  {
    icon: MapPin,
    title: "Pickup & drop-off distance",
    desc: "Fuel, time and route planning across Birmingham, the West Midlands or beyond.",
  },
  {
    icon: Building2,
    title: "Stairs, lifts & access",
    desc: "Extra time and crew for flats with stair-only access, tight landings or awkward doorways.",
  },
  {
    icon: MapPin,
    title: "City-centre parking & loading",
    desc: "Permits, walk distances and timing windows in areas like the Jewellery Quarter or Mailbox.",
  },
  {
    icon: Package,
    title: "Packing, dismantling & reassembly",
    desc: "Added labour and materials when you want boxes, wrap, beds or desks handled for you.",
  },
  {
    icon: Piano,
    title: "Fragile, bulky or high-value items",
    desc: "Pianos, antiques, artwork and electronics: extra protection and careful handling time.",
  },
  {
    icon: Calendar,
    title: "Move date & urgency",
    desc: "Weekends, same-day and end-of-month slots are busier, so book early for the best price.",
  },
  {
    icon: Warehouse,
    title: "Storage between moves",
    desc: "Weekly rate if your move-out and move-in dates don't align. Short or long term.",
  },
];

export default function PricingLogic() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
                Pricing Logic
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
                How much do{" "}
                <span className="text-[#F97316]">Birmingham removals</span> cost?
              </h2>
              <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                Every Birmingham move is priced individually because no two are the same.
                A studio flat in Moseley is not a four-bed in Sutton Coldfield. Rather
                than quote a misleading hourly rate, we look at the details that actually
                affect your day and give you a clear fixed-price quote, so the figure
                you see is the figure you pay.
              </p>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 flex items-center justify-center">
                    <BadgePoundSterling className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div className="font-[family-name:var(--font-space)] font-bold text-lg">
                    Fixed-price quote, no surprises
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  Free, no-obligation, usually back within 30 minutes. Pay only what we
                  quote. Stair surcharges, traffic delays and parking walks included.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F97316] text-white font-bold hover:bg-[#EA580C] transition-colors"
                >
                  Get a fast quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-6">
              <h3 className="font-[family-name:var(--font-space)] text-sm font-bold uppercase tracking-wider text-slate-500">
                What affects your price
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {factors.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-[#F97316] hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <h4 className="font-[family-name:var(--font-space)] text-base font-bold text-[#0B1E3F] mb-1">
                    {f.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
