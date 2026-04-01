"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Building2, BedDouble, Package } from "lucide-react";
import { useRouter } from "next/navigation";

const moveTypes = [
  { id: "house", icon: Home, label: "House Move" },
  { id: "office", icon: Building2, label: "Office Move" },
  { id: "flat", icon: BedDouble, label: "Studio / Flat" },
  { id: "items", icon: Package, label: "Single Items" },
];

export default function HeroPopup({ open, onClose }) {
  const router = useRouter();
  const [ripple, setRipple] = useState(null);

  const handleSelect = (type, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ id: type, x, y });
    setTimeout(() => {
      router.push(`/quote?type=${type}`);
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Content */}
            <div className="text-center mb-6">
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 mb-1">
                Let&apos;s get your quote
              </h2>
              <p className="text-gray-500 text-sm">
                Takes less than 2 minutes
              </p>
            </div>

            <p className="text-gray-700 font-medium text-sm mb-4">
              What are you moving?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {moveTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={(e) => handleSelect(type.id, e)}
                  className="relative flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-gray-200 bg-gray-50/50 hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-200 cursor-pointer group overflow-hidden"
                >
                  {/* Ripple */}
                  <AnimatePresence>
                    {ripple?.id === type.id && (
                      <motion.span
                        key={`ripple-${type.id}`}
                        initial={{ width: 0, height: 0, opacity: 0.5 }}
                        animate={{ width: 300, height: 300, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onAnimationComplete={() => setRipple(null)}
                        className="absolute rounded-full bg-primary/30 pointer-events-none"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors z-[1]">
                    <type.icon className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors z-[1]">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
