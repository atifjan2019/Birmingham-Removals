"use client";

import { useState } from "react";
import { Home, Building2, BedDouble, Package, ArrowRight } from "lucide-react";

const moveTypes = [
  { id: "house", icon: Home, label: "House Move", emoji: "🏠" },
  { id: "office", icon: Building2, label: "Office Move", emoji: "🏢" },
  { id: "flat", icon: BedDouble, label: "Studio / Flat", emoji: "🛏" },
  { id: "items", icon: Package, label: "Single Items", emoji: "📦" },
];

export default function Step1MoveType({ value, onChange, onNext }) {
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!value) {
      setError("Please select a move type");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div>
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#F8FAFC] mb-1">
        What are you moving?
      </h2>
      <p className="text-[#94A3B8] text-sm mb-6">
        Select your move type to get started.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {moveTypes.map((type) => {
          const selected = value === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selected
                  ? "border-[#2563EB] bg-[#2563EB]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <span className="text-3xl">{type.emoji}</span>
              <span
                className={`text-sm font-semibold ${
                  selected ? "text-[#2563EB]" : "text-[#F8FAFC]"
                }`}
              >
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

      <button
        onClick={handleContinue}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#2563EB]/90 transition-all"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
