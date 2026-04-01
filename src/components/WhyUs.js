"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, ShieldCheck, ThumbsUp, MapPin, Headphones, Award } from "lucide-react";

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 30, suffix: " Min", label: "Response Time", icon: Clock },
  { value: 500, suffix: "+", label: "Happy Customers", icon: Users },
  { value: 100, suffix: "%", label: "Fully Insured", icon: ShieldCheck },
];

const usps = [
  {
    icon: ThumbsUp,
    title: "No Hidden Fees — Ever",
    description:
      "The price we quote is the price you pay. No fuel surcharges, no staircase fees, no nasty surprises on moving day.",
  },
  {
    icon: MapPin,
    title: "Newcastle Born & Bred",
    description:
      "We know every street corner from Jesmond to Gateshead. Local knowledge means faster routes and quicker moves.",
  },
  {
    icon: Headphones,
    title: "Dedicated Move Manager",
    description:
      "You get a single point of contact from booking to delivery. One call, one person, zero runaround.",
  },
  {
    icon: Award,
    title: "Trained & Vetted Team",
    description:
      "Every member of our crew is fully trained, DBS checked, and takes genuine pride in handling your belongings.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32 relative bg-gray-50/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
            Why Choose Us
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            We Don&apos;t Just Move Boxes
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            We move lives. That&apos;s why hundreds of Newcastle families and
            businesses trust us with their most important possessions.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`glass-card p-4 sm:p-8 text-center ${i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div className="font-[family-name:var(--font-space)] text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* USPs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usps.map((usp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 glass-card p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <usp.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-gray-900 mb-2">
                  {usp.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {usp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
