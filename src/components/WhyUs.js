"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgePoundSterling, MapPin, Headphones, Award } from "lucide-react";

const reasons = [
  {
    icon: BadgePoundSterling,
    title: "Fixed, Fair Prices",
    desc: "Quote up front, price locked in. No sneaky stair surcharges, no end-of-day surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "£10m Goods-in-Transit and £5m Public Liability cover — on every single move.",
  },
  {
    icon: Award,
    title: "Trained & DBS-Checked Crews",
    desc: "Uniformed, professional movers who've handled thousands of Birmingham jobs.",
  },
  {
    icon: MapPin,
    title: "Local Birmingham Knowledge",
    desc: "We know the narrow streets, parking bays and lift restrictions of every B postcode.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    desc: "We arrive when we say we will. If we're ever late, you get 10% off — written in stone.",
  },
  {
    icon: Headphones,
    title: "Real People, Always",
    desc: "Call, WhatsApp or email — you'll speak to a real Birmingham-based coordinator, every time.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
            Why Us
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
            Birmingham&apos;s most-reviewed
            <br />
            <span className="text-[#F97316]">5-star</span> removals company
          </h2>
          <p className="text-slate-600 mt-5 text-lg">
            Hundreds of Birmingham families and businesses choose us every month. Here&apos;s why.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B1E3F] flex items-center justify-center mb-5">
                <r.icon className="w-6 h-6 text-[#F97316]" />
              </div>
              <h3 className="font-[family-name:var(--font-space)] text-lg font-bold text-[#0B1E3F] mb-2">
                {r.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
