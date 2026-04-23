"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const included = [
  {
    title: "Free fixed-price quote & move plan",
    desc: "One clear figure based on your actual move details, with no hourly surprises.",
  },
  {
    title: "Loading & unloading by a trained crew",
    desc: "DBS-checked, uniformed movers who lift, carry and stack correctly.",
  },
  {
    title: "Blankets, straps & corner protection",
    desc: "Every piece of furniture wrapped and secured before it leaves the room.",
  },
  {
    title: "Clean, serviced vans sized to your move",
    desc: "Luton vans, 7.5t trucks or multi-vehicle plans for larger homes.",
  },
  {
    title: "Optional full, part or fragile-only packing",
    desc: "Boxes, wardrobe cartons, bubble wrap and tape all included.",
  },
  {
    title: "Furniture dismantling & reassembly",
    desc: "Beds, wardrobes, desks and flat-pack taken apart and put back together.",
  },
  {
    title: "Careful handling of fragile & high-value items",
    desc: "Antiques, artwork, pianos, electronics: extra protection as standard.",
  },
  {
    title: "Arrival window, live ETA & named crew leader",
    desc: "You know who is coming, when, and can reach them on moving day.",
  },
  {
    title: "Short- & long-term storage if needed",
    desc: "Secure, CCTV-monitored units bridge the gap when dates don't align.",
  },
  {
    title: "Named office contact before, during & after",
    desc: "Real Birmingham-based staff, not a faceless overseas call centre.",
  },
];

export default function WhatsIncluded() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              What&apos;s Included
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
              What&apos;s included in our{" "}
              <span className="text-[#F97316]">Birmingham removals</span> service
            </h2>
            <p className="mt-5 text-slate-600 text-base sm:text-lg">
              A professional removals service is far more than a van and two people. From
              the first phone call to the last box in place, here is exactly what you get
              with Birmingham Removals, with no hidden extras.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {included.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 2) * 0.05 + Math.floor(i / 2) * 0.04 }}
              className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-[#F97316] hover:bg-white hover:shadow-md transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#F97316]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-space)] text-base font-bold text-[#0B1E3F] leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/quote"
            className="btn-accent inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold shadow-lg"
          >
            Get a fixed-price quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
