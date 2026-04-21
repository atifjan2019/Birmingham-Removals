"use client";

import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTAStrip({ onOpenQuote }) {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#FF6B35] to-[#E55720] text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left max-w-2xl">
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Ready for a stress-free Birmingham move?
          </h2>
          <p className="mt-3 text-white/90 text-base sm:text-lg">
            Get your fixed, no-obligation quote in under 30 minutes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="tel:+447888862003"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur font-semibold hover:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            0788 886 2003
          </a>
          {onOpenQuote ? (
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#FF6B35] font-bold hover:scale-[1.02] transition-transform shadow-xl"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#FF6B35] font-bold hover:scale-[1.02] transition-transform shadow-xl"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
