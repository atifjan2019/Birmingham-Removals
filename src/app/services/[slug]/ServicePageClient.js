"use client";

import { useState } from "react";
import Image from "next/image";
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

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-6 text-left focus:outline-none focus-visible:bg-gray-50"
      >
        <span className="font-semibold text-gray-900 text-lg pr-4">
          {faq.q}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
            open ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <div className="w-full h-px bg-gray-100 mb-4" />
          <p className="text-base text-gray-600 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicePageClient({ service }) {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/#services"
                className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mb-6 hover:gap-2.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                All Services
              </Link>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-primary border border-red-100 text-sm font-bold mb-6 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  Premium Service
                </div>
                <h1 className="font-[family-name:var(--font-space)] text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-gray-900 leading-[1.05] tracking-tight">
                  {service.heroHeading.split(" ").map((word, i) => (
                    <span key={i} className={i === 0 ? "text-primary drop-shadow-sm" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h1>
              </div>
              <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl">
                {service.heroSubtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 text-lg"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:07786738432"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-all text-lg"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  Call Us
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src={`/images/services/${service.slug}.png`}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 sm:py-32 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 sm:space-y-32">
            {service.sections.map((section, i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
              >
                {/* Left side: Sticky Heading */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="sticky top-32"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-[family-name:var(--font-space)] font-bold text-xl">
                        {i + 1}
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                      {section.heading}
                    </h2>
                  </motion.div>
                </div>

                {/* Right side: Content */}
                <div className="lg:col-span-7">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pt-2 lg:pt-16"
                  >
                    {section.paragraphs && (
                      <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                        {section.paragraphs.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    )}

                    {section.list && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.list.map((item, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-md transition-all duration-300"
                          >
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-gray-800 font-medium pt-0.5">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-24 sm:py-32 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="sticky top-32"
                >
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
                    FAQs
                  </span>
                  <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Got Questions?
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Everything you need to know about our {service.title.toLowerCase()} service. If you need more details, don't hesitate to reach out.
                  </p>
                </motion.div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] bg-gray-900 p-10 sm:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Background glowing blobs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-gray-300 text-xl mb-12">
                Get a free, no-obligation quote in under 2 minutes. Our team will
                be in touch within hours to confirm your booking.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 text-lg w-full sm:w-auto"
                >
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:07786738432"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-lg w-full sm:w-auto backdrop-blur-md"
                >
                  <Phone className="w-5 h-5" />
                  Speak to an Expert
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
