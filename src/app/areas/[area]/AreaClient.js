"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import HeroPopup from "@/components/HeroPopup";

export default function AreaClient({ areaData }) {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuote={() => setPopupOpen(true)} />
      
      {/* Area-Specific Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={areaData.image} 
            alt={`Removals in ${areaData.name}`}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/80 to-primary/30" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4" />
            Local Experts in {areaData.name}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Removals in <span className="text-primary">{areaData.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            {areaData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setPopupOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 w-full sm:w-auto justify-center"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:07943480432"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 text-primary" />
              0794 348 0432
            </a>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* Area specific content details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                Why Choose Our {areaData.name} Removal Services?
              </h2>
              <p className="text-muted mb-6 text-lg">
                Moving can be stressful, but with Newcastle Removals operating directly in {areaData.name}, you are guaranteed a seamless, professional experience from start to finish. We know the local roads, parking restrictions, and best routes.
              </p>
              <ul className="space-y-4">
                {[
                  "Local knowledge avoiding traffic and parking fines",
                  "Fully insured goods in transit and public liability",
                  "Trained, uniformed, and professional local staff",
                  "Modern fleet of appropriately sized vans and trucks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Need a quote quickly?</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fast Response</h4>
                    <p className="text-sm text-muted">Quotes provided within 2 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Top Rated</h4>
                    <p className="text-sm text-muted">Hundreds of 5-star Google Reviews</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPopupOpen(true)}
                className="mt-8 w-full block text-center px-6 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
              >
                Start My Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <HowItWorks />
      
      <Footer onOpenQuote={() => setPopupOpen(true)} />
      <HeroPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
