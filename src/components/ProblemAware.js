"use client";

import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Piano,
  Clock,
  Calendar,
  Headphones,
} from "lucide-react";

const problems = [
  {
    icon: Building2,
    title: "Flat & apartment access",
    desc: "Lifts, landings and stair-only buildings. We plan for every access type across Birmingham.",
  },
  {
    icon: MapPin,
    title: "City-centre parking & loading",
    desc: "Permits, restricted bays and tight windows handled before the van rolls.",
  },
  {
    icon: Piano,
    title: "Heavy & fragile furniture",
    desc: "Wardrobes, sofas, pianos, glass, antiques: protected, wrapped, strapped.",
  },
  {
    icon: Clock,
    title: "Same-day & urgent moves",
    desc: "Completion fell through? Crew dispatched fast across the West Midlands when we can.",
  },
  {
    icon: Calendar,
    title: "Office move timing",
    desc: "Evening, weekend and out-of-hours scheduling so your business keeps running.",
  },
  {
    icon: Headphones,
    title: "Clear communication",
    desc: "A named contact from first call to final item, with no call-centre run-around.",
  },
];

export default function ProblemAware() {
  return (
    <section className="py-24 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F97316]/5 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
                Local challenges, local fixes
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
                Moving in Birmingham comes with challenges.{" "}
                <span className="text-[#F97316]">We handle them.</span>
              </h2>
              <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                From tight city-centre loading bays and multi-storey stair access to heavy
                sofas, fragile heirlooms, office downtime and last-minute date changes, no
                Birmingham move is the same. Our crew plans around property type, access
                points, parking restrictions, item volume and your timeline, so every
                move runs calmly from first quote to final placement.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#F97316] hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0B1E3F] flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-space)] text-base font-bold text-[#0B1E3F] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
