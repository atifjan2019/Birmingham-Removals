"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const primaryAreas = [
  { slug: "city-centre", name: "Birmingham City Centre", postcode: "B1–B5" },
  { slug: "edgbaston", name: "Edgbaston", postcode: "B15, B16" },
  { slug: "harborne", name: "Harborne", postcode: "B17" },
  { slug: "moseley", name: "Moseley", postcode: "B13" },
  { slug: "selly-oak", name: "Selly Oak", postcode: "B29" },
  { slug: "kings-heath", name: "Kings Heath", postcode: "B14" },
  { slug: "erdington", name: "Erdington", postcode: "B23, B24" },
  { slug: "sutton-coldfield", name: "Sutton Coldfield", postcode: "B72–B76" },
  { slug: "solihull", name: "Solihull", postcode: "B91, B92" },
];

const surroundingAreas = [
  { slug: "kings-norton", name: "Kings Norton" },
  { slug: "acocks-green", name: "Acocks Green" },
  { slug: "hall-green", name: "Hall Green" },
  { slug: "bearwood", name: "Bearwood" },
  { slug: "great-barr", name: "Great Barr" },
  { slug: "handsworth", name: "Handsworth" },
  { slug: "quinton", name: "Quinton" },
  { slug: "dudley", name: "Dudley" },
  { slug: "west-bromwich", name: "West Bromwich" },
  { slug: "wolverhampton", name: "Wolverhampton" },
  { slug: "coventry", name: "Coventry" },
];

export default function AreasCovered() {
  return (
    <section className="py-24 sm:py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F97316]/5 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0B1E3F]/5 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Areas We Cover
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
              Removals across{" "}
              <span className="text-[#F97316]">Birmingham</span> &amp; the West Midlands
            </h2>
            <p className="mt-5 text-slate-600 text-base sm:text-lg">
              Whether you&apos;re leaving a student flat in Selly Oak, moving a family
              home in Sutton Coldfield, relocating an office in the Jewellery Quarter or
              shifting a one-bed apartment out of the Mailbox, our crew plans around the
              real access, parking and timing realities of each neighbourhood.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {primaryAreas.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                href={`/areas/${a.slug}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#F97316] hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0 group-hover:bg-[#F97316] transition-colors">
                  <MapPin className="w-5 h-5 text-[#F97316] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-base group-hover:text-[#F97316] transition-colors">
                    {a.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.postcode}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#F97316] group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="font-[family-name:var(--font-space)] text-lg font-bold text-[#0B1E3F]">
              Also covering the wider West Midlands
            </h3>
            <Link
              href="/areas"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#F97316] hover:gap-2 transition-all"
            >
              See all areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {surroundingAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-[#0B1E3F] hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {a.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
