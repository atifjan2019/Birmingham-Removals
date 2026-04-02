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
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm pr-4">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-5 text-sm text-muted leading-relaxed">
          {faq.a}
        </p>
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
              <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {service.heroHeading}
              </h1>
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
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50/50 via-white to-white -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 lg:space-y-28">
            {service.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Large Number Watermark */}
                <div className="absolute -top-12 -left-8 text-[10rem] font-black text-gray-50/60 z-0 select-none font-[family-name:var(--font-space)] tracking-tighter">
                  0{i + 1}
                </div>

                <div className="relative z-10 glass-card p-8 sm:p-12 shadow-sm shadow-gray-200/50">
                  <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                    <span className="w-10 h-1.5 bg-primary rounded-full hidden sm:block" />
                    {section.heading}
                  </h2>

                  {section.paragraphs && (
                    <div className="space-y-6 mb-8">
                      {section.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className="text-gray-600 text-lg leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.list && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                      {section.list.map((item, j) => (
                        <motion.li
                          key={j}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100/80 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                            <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                          </div>
                          <span className="text-gray-800 font-medium text-sm sm:text-base">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
                FAQs
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Common Questions
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                Everything you need to know about our {service.title.toLowerCase()} service.
              </p>
            </motion.div>

            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote in under 2 minutes. Our team will
              be in touch within hours to confirm your booking.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 text-lg"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
