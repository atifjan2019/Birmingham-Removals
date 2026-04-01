"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";

export default function Step5Loading({ fromPostcode, moveDate, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const timerRef = useRef(null);

  const formattedDate = moveDate
    ? new Date(moveDate).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
      })
    : "your chosen date";

  const messages = [
    `Checking availability near ${fromPostcode || "your area"}...`,
    "Comparing local Newcastle removal teams...",
    "Calculating your route...",
    `Reviewing ${formattedDate}...`,
    "Almost ready...",
  ];

  useEffect(() => {
    // Progress bar: fill to 94% over 5 seconds
    const start = Date.now();
    const duration = 5000;
    const target = 94;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * target, target);
      setProgress(pct);
      if (elapsed < duration) {
        timerRef.current = requestAnimationFrame(tick);
      }
    };
    timerRef.current = requestAnimationFrame(tick);

    // Message rotation every 1.2s
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
    }, 1200);

    // Auto advance at 5s
    const timeout = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      cancelAnimationFrame(timerRef.current);
      clearInterval(msgInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#F8FAFC] mb-2">
          Finding your best price...
        </h2>
        <p className="text-[#94A3B8] text-sm">
          Hang tight — this takes a few seconds.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right mt-1">
          <span className="text-xs text-[#94A3B8]">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Status messages */}
      <div className="space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-300 ${
              i <= messageIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <CheckCircle
              className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                i < messageIndex
                  ? "text-emerald-400"
                  : i === messageIndex
                  ? "text-[#2563EB] animate-pulse"
                  : "text-white/10"
              }`}
            />
            <span
              className={`text-sm ${
                i <= messageIndex ? "text-[#F8FAFC]" : "text-[#94A3B8]"
              }`}
            >
              {msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
