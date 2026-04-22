"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`rounded-2xl border transition-all ${
        open ? "border-[#F97316] bg-white shadow-md" : "border-slate-200 bg-slate-50"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
      >
        <span className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-base sm:text-lg">
          {faq.q}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            open ? "bg-[#F97316] text-white" : "bg-white border border-slate-200 text-[#0B1E3F]"
          }`}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.a}</p>
      </div>
    </motion.div>
  );
}

export default function ServicePageClient({ service }) {
  return (
    <>
      <Navbar />

      <section className="relative pt-20 pb-16 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-[#F97316]/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#F97316] text-sm font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F97316]" />
              </span>
              Birmingham&apos;s 5-star service
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              {service.heroHeading}
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">{service.heroSubtext}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/quote"
                className="btn-accent inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold rounded-full"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+447365380090"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all backdrop-blur"
              >
                <Phone className="w-5 h-5 text-[#F97316]" />
                07365 380090
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {service.sections.map((section, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#F97316]/10 text-[#F97316] font-[family-name:var(--font-space)] font-bold text-lg">
                    0{i + 1}
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] leading-tight">
                  {section.heading}
                </h2>
              </div>
              <div className="lg:col-span-7">
                {section.paragraphs && (
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base">{p}</p>
                    ))}
                  </div>
                )}
                {section.list && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.list.map((item, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#F97316] hover:bg-white transition-all"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
                FAQ
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] leading-tight mb-4">
                Got questions?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Everything you need to know about our {service.title.toLowerCase()} service in
                Birmingham. Still not sure? Give us a call — we&apos;re happy to chat.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-3">
              {service.faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTAStrip />
      <Footer />
    </>
  );
}
