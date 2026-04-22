"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much do Birmingham removals cost?",
    a: "Typical 2-bed moves start around £350, and 3-bed homes from £550. We give a fixed, all-in quote within 30 minutes of your enquiry — no hidden charges.",
  },
  {
    q: "How far in advance should I book?",
    a: "1–2 weeks is ideal, especially for end-of-month weekends. That said, we regularly handle same-day and next-day bookings across Birmingham and the wider West Midlands.",
  },
  {
    q: "Are you insured?",
    a: "Yes — £10m Goods-in-Transit insurance and £5m Public Liability cover is included on every single move.",
  },
  {
    q: "Do you cover areas outside Birmingham?",
    a: "Yes — Solihull, Sutton Coldfield, Dudley, West Bromwich, Wolverhampton and Coventry are all covered daily. Long-distance moves from Birmingham to London, Manchester and beyond are quoted free.",
  },
  {
    q: "Do you offer packing services?",
    a: "Yes — full pack, partial pack or fragile-only. All materials (boxes, wrap, tape, wardrobe cartons) are included in the packing service price.",
  },
  {
    q: "Can you store my stuff between moves?",
    a: "Yes — our secure, CCTV-monitored Birmingham storage facility offers flexible short and long-term contracts, with collection and delivery available.",
  },
  {
    q: "What payment do you accept?",
    a: "Bank transfer, card or cash. A small deposit secures your date, balance on completion.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "border-[#F97316] bg-white shadow-md"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-base sm:text-lg">
                    {f.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isOpen ? "bg-[#F97316] text-white" : "bg-white text-[#0B1E3F] border border-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
