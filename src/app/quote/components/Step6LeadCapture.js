"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Lock, User, Phone, ArrowLeft, Loader2 } from "lucide-react";

const UK_MOBILE_REGEX = /^07\d{3}\s?\d{3}\s?\d{3}$/;

export default function Step6LeadCapture({ data, onChange, onSubmit, onBack }) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const formattedDate = data.moveDate
    ? new Date(data.moveDate).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
      })
    : "your chosen date";

  const validate = () => {
    const errs = {};
    if (!data.fullName || data.fullName.trim().length < 2) {
      errs.fullName = "Please enter your name";
    }
    if (!data.phone || !UK_MOBILE_REGEX.test(data.phone.trim())) {
      errs.phone = "Enter a valid UK mobile (07xxx xxx xxx)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    onSubmit();
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Amber banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-amber-300 text-sm font-semibold">
          ⚡ Limited Slots This Week
        </span>
      </div>

      {/* Blurred price card */}
      <div className="relative rounded-xl bg-white/[0.03] border border-white/10 p-6 text-center mb-6 overflow-hidden">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-[#94A3B8]" />
          <span className="text-[#94A3B8] text-xs uppercase tracking-wide font-medium">
            Your price is ready to unlock
          </span>
        </div>
        <div className="font-[family-name:var(--font-space)] text-4xl font-bold text-[#F8FAFC]/20 blur-md select-none">
          £285 — £420
        </div>
      </div>

      {/* Scarcity text */}
      <p className="text-[#94A3B8] text-sm mb-4 leading-relaxed">
        We limit to <strong className="text-[#F8FAFC]">3 new bookings per day</strong> to
        guarantee quality service in your area.
      </p>

      {/* Pulsing red dot */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-[#F8FAFC] text-sm">
          <strong>2 slots remaining</strong> for {formattedDate}
        </span>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Full name"
              value={data.fullName || ""}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[#F8FAFC] placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="tel"
              placeholder="UK mobile (07xxx xxx xxx)"
              value={data.phone || ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[#F8FAFC] placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full py-4 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#2563EB]/90 transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Unlocking...
          </>
        ) : (
          "Unlock My Price & Reserve Slot"
        )}
      </button>

      {/* Small print */}
      <p className="text-[#94A3B8]/50 text-xs text-center mt-3">
        No spam. We&apos;ll call within 2 hours.
      </p>

      <div className="mt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </motion.div>
  );
}
