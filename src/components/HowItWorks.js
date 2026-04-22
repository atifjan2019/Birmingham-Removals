"use client";

import { motion } from "framer-motion";
import { ClipboardList, Calculator, Calendar, Truck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell us the details",
    desc: "Share postcodes, date and what's moving. Takes 2 minutes online or 1 call away.",
  },
  {
    icon: Calculator,
    step: "02",
    title: "Get a fixed quote",
    desc: "Transparent, all-in price within 30 minutes. No hidden fees, no guesswork.",
  },
  {
    icon: Calendar,
    step: "03",
    title: "Book your date",
    desc: "Pick the slot that suits you,weekdays, weekends or evenings. Same-day slots often available.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Moving day, sorted",
    desc: "Our uniformed, DBS-checked crew arrives on time and gets you safely into your new Birmingham address.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-28 bg-[#0B1E3F] text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.04]" />
      <div className="absolute -top-40 right-0 w-[40rem] h-[40rem] bg-[#F97316]/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Book your Birmingham move
            <br />
            in <span className="text-[#F97316]">four simple steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#F97316]/40 transition-all"
            >
              <div className="absolute -top-4 left-7 px-3 py-1 rounded-full bg-[#F97316] text-white text-xs font-bold tracking-wider">
                STEP {s.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#F97316]/15 flex items-center justify-center mt-3 mb-5">
                <s.icon className="w-6 h-6 text-[#F97316]" />
              </div>
              <h3 className="font-[family-name:var(--font-space)] text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
