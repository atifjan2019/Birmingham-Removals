"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Patel",
    location: "Edgbaston, B15",
    quote:
      "Absolutely brilliant from start to finish. The team arrived exactly on time, wrapped everything with real care, and had us moved into our Edgbaston house by 2pm. Worth every penny.",
    rating: 5,
  },
  {
    name: "James Whitmore",
    location: "Solihull, B91",
    quote:
      "Used them for a 4-bed move from Moseley to Solihull. Fixed price agreed, no surprises, and they even reassembled the kids' bunk bed. Honestly the easiest house move we've ever done.",
    rating: 5,
  },
  {
    name: "Priya Shah",
    location: "Harborne, B17",
    quote:
      "Booked a last-minute man and van for a flat move in Harborne. They came within 2 hours, were polite, careful and charged exactly what they quoted. Recommending to all my friends.",
    rating: 5,
  },
  {
    name: "Daniel O'Connor",
    location: "Jewellery Quarter, B3",
    quote:
      "Office relocation done over a weekend — Monday morning we were up and running. Professional, efficient, and they handled all our IT gear without a single hitch.",
    rating: 5,
  },
  {
    name: "Emma Richardson",
    location: "Sutton Coldfield, B74",
    quote:
      "We moved from London to Sutton Coldfield with them — smooth, punctual, and they protected my grandmother's antique dresser like their own. Five stars doesn't feel like enough.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
            Reviews
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
            What our <span className="text-[#F97316]">Birmingham</span> customers say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex text-[#F97316]">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#0B1E3F]">4.9 / 5</span>
            <span className="text-slate-500">from 312+ Google reviews</span>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 relative shadow-sm"
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-[#F97316]/10" />
              <div className="flex text-[#F97316] mb-5">
                {[...Array(t.rating)].map((_, k) => (
                  <Star key={k} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg sm:text-xl text-[#0B1E3F] leading-relaxed mb-8 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white font-bold flex items-center justify-center">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-[#0B1E3F]">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#F97316] hover:text-[#F97316] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Go to review ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-[#F97316]" : "w-2 bg-slate-300"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#F97316] hover:text-[#F97316] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
