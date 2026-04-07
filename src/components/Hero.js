"use client";


import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Truck, Star, Zap, Clock, ShieldCheck } from "lucide-react";


const headline = "Newcastle's Most Trusted Removals Company";
const words = headline.split(" ");

const stats = [
  { icon: Truck, value: "500+", label: "Moves Completed" },
  { icon: Star, value: "5-Star", label: "Google Rating" },
  { icon: Zap, value: "Same Day", label: "Available" },
];

export default function Hero({ onOpenQuote }) {

  return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50/30">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-removals.png"
            alt="Newcastle Removals team loading a van in Newcastle"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2"
            >
              <Clock className="w-4 h-4" />
              Free quotes in under 30 minutes
            </motion.div>

            {/* Headline - word by word reveal */}
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 text-gray-900">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="inline-block mr-[0.3em]"
                >
                  {word === "Trusted" || word === "Removals" ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg sm:text-xl text-muted max-w-xl mb-3"
            >
              Professional house and office removals serving Jesmond, Gosforth,
              Heaton, Gateshead and all across Tyneside. Fully insured,
              competitively priced, zero stress.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-row items-start gap-2 sm:gap-4"
            >
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 text-base sm:text-lg cursor-pointer"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 py-3.5 sm:px-8 sm:py-4 border border-gray-200 text-gray-900 font-semibold rounded-full hover:bg-gray-50 hover:scale-105 transition-all text-base sm:text-lg bg-white/80 backdrop-blur-sm"
              >
                View Services
              </a>
            </motion.div>

            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-sm ${i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-[family-name:var(--font-space)] font-bold text-gray-900 text-sm sm:text-base">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-muted leading-tight">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
    </section>
  );
}
