"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Phone, User } from "lucide-react";

const moveTypeLabels = {
  house: "House Move",
  office: "Office Move",
  flat: "Studio / Flat",
  items: "Single Items",
};

export default function Step7Success({ data }) {
  const firstName = data.fullName ? data.fullName.split(" ")[0] : "there";

  const formattedDate = data.moveDate
    ? new Date(data.moveDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Flexible";

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      const fire = confetti.default;
      fire({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#BC2436", "#E8485A", "#10B981"],
      });
    });
  }, []);

  return (
    <div className="py-4 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10"
          fill="none"
          stroke="#10B981"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 mb-2"
      >
        You&apos;re booked in, {firstName}!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="text-muted text-sm mb-8"
      >
        Our team will call you on{" "}
        <strong className="text-gray-900">{data.phone}</strong> within 2 hours.
      </motion.p>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left space-y-3"
      >
        <div className="text-xs text-muted uppercase tracking-wide font-medium mb-3">
          Your Quote Summary
        </div>

        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-primary shrink-0" />
          <span className="text-gray-900 text-sm">{data.fullName}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-primary shrink-0" />
          <span className="text-gray-900 text-sm">{data.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="text-gray-900 text-sm">
            {data.fromPostcode} → {data.toPostcode}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <span className="text-gray-900 text-sm">{formattedDate}</span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <span className="text-muted text-xs">Move type: </span>
          <span className="text-gray-900 text-xs font-medium">
            {moveTypeLabels[data.moveType] || data.moveType}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
