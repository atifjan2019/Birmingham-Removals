"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Lock, User, Phone, ArrowLeft, Loader2, Mail } from "lucide-react";
import { createBooking, captureAbandonedLead } from "@/app/actions/booking";
import { useEffect, useRef } from "react";

const UK_MOBILE_REGEX = /^07\d{3}\s?\d{3}\s?\d{3}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Step6LeadCapture({ data, onChange, onSubmit, onBack }) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const captureTimeout = useRef(null);

  // Auto-capture abandoned lead when user types contact info
  useEffect(() => {
    const hasContact = (data.phone && data.phone.length >= 8) || (data.email && data.email.includes("@"));
    if (hasContact && !submitting) {
      if (captureTimeout.current) clearTimeout(captureTimeout.current);
      captureTimeout.current = setTimeout(() => {
        captureAbandonedLead(data);
      }, 3000); // 3 seconds after they stop typing
    }
    return () => {
      if (captureTimeout.current) clearTimeout(captureTimeout.current);
    };
  }, [data, submitting]);

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
    if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
      errs.email = "Please enter a valid email address";
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
    
    const submissionData = {
      ...data,
      extras: data.extras || []
    };

    try {
      const result = await createBooking(submissionData);
      setSubmitting(false);
      
      if (result?.success) {
        onSubmit();
      } else {
        alert(result?.error || "System error. Please try again or call us.");
      }
    } catch (err) {
      setSubmitting(false);
      alert("Network error submitting quote.");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Amber banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 mb-6">
        <Zap className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-amber-800 text-sm font-semibold">
          ⚡ Limited Slots This Week
        </span>
      </div>

      {/* Blurred price card */}
      <div className="relative rounded-xl bg-gray-50 border border-gray-200 p-6 text-center mb-6 overflow-hidden">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-muted" />
          <span className="text-muted text-xs uppercase tracking-wide font-medium">
            Your price is ready to unlock
          </span>
        </div>
        <div className="font-[family-name:var(--font-space)] text-4xl font-bold text-gray-900/15 blur-md select-none">
          £285 — £420
        </div>
      </div>

      {/* Scarcity text */}
      <p className="text-muted text-sm mb-4 leading-relaxed">
        We limit to <strong className="text-gray-900">3 new bookings per day</strong> to
        guarantee quality service in your area.
      </p>

      {/* Pulsing red dot */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-gray-900 text-sm">
          <strong>2 slots remaining</strong> for {formattedDate}
        </span>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Full name"
              value={data.fullName || ""}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="email"
              placeholder="Email address"
              value={data.email || ""}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="tel"
              placeholder="UK mobile (07xxx xxx xxx)"
              value={data.phone || ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
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
      <p className="text-muted/60 text-xs text-center mt-3">
        No spam. We&apos;ll call within 2 hours.
      </p>

      <div className="mt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted hover:text-gray-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </motion.div>
  );
}
