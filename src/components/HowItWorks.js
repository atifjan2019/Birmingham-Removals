"use client";

import { motion } from "framer-motion";
import { ClipboardList, Calculator, Truck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Fill the Form",
    description:
      "Tell us where you're moving from, where you're going, and what you need. Takes less than 2 minutes.",
  },
  {
    icon: Calculator,
    step: "02",
    title: "Get Your Quote",
    description:
      "We'll review your details and call you back within 30 minutes with a clear, no-obligation quote.",
  },
  {
    icon: Truck,
    step: "03",
    title: "We Handle Everything",
    description:
      "Sit back. Our team arrives on time, handles every box, and gets you settled in your new place stress-free.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white">
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
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Three Steps to a Stress-Free Move
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            No complicated process. No back and forth. Just a simple,
            straightforward way to get moving.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 -translate-y-1/2">
            <div className="w-full h-full border-t-2 border-dashed border-primary/20" />
          </div>

          {/* Mobile connector line */}
          <div className="md:hidden absolute left-8 top-[60px] bottom-[60px] w-0.5">
            <div className="w-full h-full border-l-2 border-dashed border-primary/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative flex md:flex-col items-start md:items-center md:text-center gap-6 md:gap-0"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0 md:mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <div>
                  <span className="text-primary/50 text-xs font-bold uppercase tracking-widest mb-1 block">
                    Step {step.step}
                  </span>
                  <h3 className="font-[family-name:var(--font-space)] text-xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
