"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    area: "Jesmond",
    rating: 5,
    text: "Absolutely brilliant from start to finish. The lads turned up early, were incredibly careful with our furniture, and had us moved into our new place in Jesmond by lunchtime. Can't recommend them enough.",
  },
  {
    name: "David Thompson",
    area: "Gosforth",
    rating: 5,
    text: "We'd been dreading the move from our 4-bed in Gosforth but Swift made it genuinely stress-free. They packed everything the day before and had it all set up in the new house by 3pm. Superb service.",
  },
  {
    name: "Emma Richardson",
    area: "Heaton",
    rating: 5,
    text: "Used their man and van service for a studio flat move in Heaton. Quick, affordable, and the driver was dead friendly. Felt like I was being helped by a mate, not a removal company.",
  },
  {
    name: "James Walker",
    area: "Gateshead",
    rating: 5,
    text: "Our office move in Gateshead went seamlessly. They worked over the weekend so we had zero downtime on Monday. Professional, organised, and great value for money.",
  },
  {
    name: "Rachel Evans",
    area: "Tynemouth",
    rating: 5,
    text: "They moved my mum's piano without a single scratch — I was genuinely impressed. The specialist team clearly knew exactly what they were doing. Worth every penny.",
  },
  {
    name: "Mark Henderson",
    area: "Ponteland",
    rating: 5,
    text: "Third time using Swift and they've never let us down. Moved from Ponteland to the city centre and everything arrived in perfect condition. These lads are the best in Newcastle, hands down.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoPlay();
  };

  const prev = () => goTo((current - 1 + reviews.length) % reviews.length);
  const next = () => goTo((current + 1) % reviews.length);

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative bg-gray-50/50">
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
            Testimonials
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Newcastle Says About Us
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it — hear from the families and
            businesses we&apos;ve helped move across Tyneside.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 sm:p-10"
              >
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                <p className="text-gray-900 text-lg leading-relaxed mb-8">
                  &ldquo;{reviews[current].text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-[family-name:var(--font-space)] font-bold text-gray-900">
                      {reviews[current].name}
                    </div>
                    <div className="text-sm text-muted">
                      {reviews[current].area}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: reviews[current].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-muted" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-muted" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
