"use client";

import { motion } from "framer-motion";
import { ArrowRight, Truck, Star, Zap, Clock } from "lucide-react";

const headline = "Newcastle's Most Trusted Removals Company";
const words = headline.split(" ");

const stats = [
  { icon: Truck, value: "500+", label: "Moves Completed" },
  { icon: Star, value: "5-Star", label: "Google Rating" },
  { icon: Zap, value: "Same Day", label: "Available" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <Clock className="w-4 h-4" />
          Free quotes in under 30 minutes
        </motion.div>

        {/* Headline - word by word reveal */}
        <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-5xl mx-auto">
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
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10"
        >
          Professional house and office removals serving Jesmond, Gosforth,
          Heaton, Gateshead and all across Tyneside. Fully insured, competitively
          priced, zero stress.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 text-lg"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-foreground font-semibold rounded-full hover:bg-white/5 hover:scale-105 transition-all text-lg"
          >
            View Services
          </a>
        </motion.div>

        {/* Floating stat badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-16"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card px-5 py-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-[family-name:var(--font-space)] font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated truck at bottom */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden opacity-20">
        <div className="animate-truck">
          <Truck className="w-16 h-16 text-primary" />
        </div>
      </div>
    </section>
  );
}
