"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Phone, User, ArrowRight } from "lucide-react";

const moveTypeLabels = {
  house: "House Move",
  office: "Office Move",
  flat: "Studio / Flat",
  items: "Single Items",
};

export default function Step7Success({ data, detailsToken }) {
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
        Thanks, {firstName}. We have your enquiry.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="text-muted text-sm mb-8"
      >
        This is not a booking yet. We will call you on{" "}
        <strong className="text-gray-900">{data.phone}</strong> within 2 hours to agree your price and date.
      </motion.p>

      {/* One more step: the move details form, on the enquiry's own link. */}
      {detailsToken ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
          className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-left"
        >
          <p className="text-sm font-bold text-gray-900">One more step: tell us what you are moving</p>
          <p className="mt-1 text-sm text-gray-600">
            Add a list or photos of your items, whether it is a flat or a house, and how many people you need.
            It takes a couple of minutes and saves the back and forth on WhatsApp.
          </p>
          {/* A plain link, so the form opens with a full page load: the session
              recorder running on this page is then not carried into a private one. */}
          <a
            href={`/move-details/${detailsToken}`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark"
          >
            Add your move details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs text-gray-500">We are emailing you this link as well, so you can do it later.</p>
        </motion.div>
      ) : null}

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left space-y-3"
      >
        <div className="text-xs text-muted uppercase tracking-wide font-medium mb-3">
          Your Enquiry Summary
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
