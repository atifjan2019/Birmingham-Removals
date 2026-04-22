"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, ShieldCheck, Clock, Star, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import CTAStrip from "@/components/CTAStrip";
import HeroPopup from "@/components/HeroPopup";

export default function AreaClient({ areaData }) {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuote={() => setPopupOpen(true)} />

      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={areaData.image}
            alt={`Removals in ${areaData.name}`}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E3F] via-[#0B1E3F]/85 to-[#F97316]/20" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur mb-5"
          >
            <MapPin className="w-4 h-4 text-[#F97316]" />
            Local Birmingham removals · {areaData.postcode || areaData.name}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Removals in <span className="text-[#F97316]">{areaData.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto mt-6"
          >
            {areaData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          >
            <button
              onClick={() => setPopupOpen(true)}
              className="btn-accent inline-flex items-center gap-2 px-7 py-4 font-semibold rounded-full w-full sm:w-auto justify-center"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:+447365380090"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all w-full sm:w-auto justify-center backdrop-blur"
            >
              <Phone className="w-5 h-5 text-[#F97316]" />
              07365 380090
            </a>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
                Local Specialists
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold mb-5 text-[#0B1E3F] leading-tight">
                Why choose us for your {areaData.name} move?
              </h2>
              <p className="text-slate-600 mb-7 text-base leading-relaxed">
                Moving can be stressful — but with Birmingham Removals operating daily in{" "}
                {areaData.name}, you get a seamless, professional service from start to finish.
                We know the local roads, parking restrictions and quickest routes in and out.
              </p>
              <ul className="space-y-3">
                {[
                  "Local knowledge — no parking fines or wrong turns",
                  "Fully insured: goods-in-transit & public liability",
                  "Uniformed, DBS-checked Birmingham-based crews",
                  "Modern fleet, right size van for your move",
                  "Fixed pricing with no weekend or stair surcharges",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-8 sm:p-10">
              <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#0B1E3F] mb-6">
                Need a quote quickly?
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1E3F]">Fast Response</h4>
                    <p className="text-sm text-slate-500">Quotes within 30 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1E3F]">Top Rated in {areaData.name}</h4>
                    <p className="text-sm text-slate-500">4.9★ on 312+ Google reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1E3F]">Fully Insured</h4>
                    <p className="text-sm text-slate-500">£10m goods-in-transit cover</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPopupOpen(true)}
                className="mt-8 btn-accent w-full block text-center px-6 py-4 font-bold rounded-full"
              >
                Start my quote →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <HowItWorks />
      <CTAStrip onOpenQuote={() => setPopupOpen(true)} />
      <Footer />
      <HeroPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
