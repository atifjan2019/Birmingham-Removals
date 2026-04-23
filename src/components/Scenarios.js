"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Building2,
  Users,
  Briefcase,
  Clock,
  Package,
  ArrowRight,
} from "lucide-react";

const scenarios = [
  {
    icon: Home,
    title: "House Moves",
    href: "/services/house-removals",
    body: "For family homes, terraces, semis and detached properties across Birmingham and Solihull. Full-service loading, dismantling, protected transport and room-by-room unloading, so you can focus on settling in, not lifting boxes.",
  },
  {
    icon: Building2,
    title: "Flat & Apartment Moves",
    href: "/services/house-removals",
    body: "Stair-access flats, lift-served apartments, split-level maisonettes and city-centre blocks with restricted loading bays. We survey access before quoting, confirm parking permits where needed, and size the crew to keep the move moving.",
  },
  {
    icon: Users,
    title: "Student Moves",
    href: "/services/man-and-van",
    body: "Halls to shared houses, HMO room changes, end-of-term returns and inter-university moves across Selly Oak, Edgbaston, Aston and the university corridor. Low-volume pricing and weekend slots available.",
  },
  {
    icon: Briefcase,
    title: "Office Relocations",
    href: "/services/office-removals",
    body: "Planned business moves for SMEs, co-working tenants and city-centre offices. Evening and weekend scheduling to avoid downtime, IT and server handling, filing systems kept in order, and furniture reassembly on arrival.",
  },
  {
    icon: Clock,
    title: "Same-Day & Urgent Moves",
    href: "/services/man-and-van",
    body: "Completion delays, landlord changes, emergency clearances: when plans shift, we move fast. Call before midday where possible and we'll tell you honestly what's achievable today.",
  },
  {
    icon: Package,
    title: "Furniture-Only Moves",
    href: "/services/piano-and-specialist-items",
    body: "Single sofas, wardrobes, dining sets, pianos and bulky appliances. Flat-pack dismantling and reassembly included where needed, perfect when you don't need a full removals service.",
  },
];

export default function Scenarios() {
  return (
    <section className="py-24 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Move Scenarios
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
              Moving services for homes, flats, offices &amp;{" "}
              <span className="text-[#F97316]">last-minute moves</span>
            </h2>
            <p className="mt-5 text-slate-600 text-base sm:text-lg">
              Every Birmingham move is different. Here&apos;s how we adapt to the most
              common situations we handle across the West Midlands.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={s.href}
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F] mb-3 group-hover:text-[#F97316] transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
