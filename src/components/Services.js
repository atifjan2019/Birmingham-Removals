"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import servicesData from "@/lib/servicesData";

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] leading-tight max-w-2xl">
              Removals services across{" "}
              <span className="text-[#FF6B35]">Birmingham</span> &amp; the West Midlands
            </h2>
          </motion.div>
          <p className="text-slate-600 text-base max-w-md">
            Whatever you&apos;re moving, wherever it&apos;s going — we&apos;ve got the team, the vans
            and the Birmingham know-how to get it there safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full bg-white rounded-2xl p-7 border border-slate-200 hover:border-[#FF6B35] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#14375C] flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#FF6B35] group-hover:rotate-45 transition-all duration-300" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.shortDesc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
