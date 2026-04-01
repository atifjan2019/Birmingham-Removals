"use client";

import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Truck,
  Package,
  Warehouse,
  Piano,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "House Removals",
    description:
      "Full house moves across Newcastle, from studio flats in Heaton to family homes in Gosforth. We handle everything with care.",
  },
  {
    icon: Building2,
    title: "Office Removals",
    description:
      "Minimal disruption office relocations. We work evenings and weekends so your business keeps running without a hitch.",
  },
  {
    icon: Truck,
    title: "Man & Van",
    description:
      "Need a quick move or a few items shifting? Our man and van service covers Newcastle, Gateshead, and beyond — same day available.",
  },
  {
    icon: Package,
    title: "Packing Service",
    description:
      "Professional packing with premium materials. We wrap, box, and protect your belongings so nothing gets damaged in transit.",
  },
  {
    icon: Warehouse,
    title: "Storage Solutions",
    description:
      "Secure, clean storage facilities near Newcastle. Short or long term, flexible access, and fully insured.",
  },
  {
    icon: Piano,
    title: "Piano & Specialist Items",
    description:
      "Heavy, awkward, or valuable items? Our specialist team handles pianos, antiques, and fragile goods with expert precision.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
            What We Do
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Removals Services in Newcastle
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Whatever you need moving, wherever you need it — we&apos;ve got the
            team, the vans, and the experience to make it happen.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-8 group cursor-pointer hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-space)] text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
