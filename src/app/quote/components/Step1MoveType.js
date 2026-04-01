"use client";

import { useState } from "react";
import { Home, Building2, BedDouble, Package, ArrowRight } from "lucide-react";

const moveTypes = [
  { id: "house", icon: Home, label: "House Move" },
  { id: "office", icon: Building2, label: "Office Move" },
  { id: "flat", icon: BedDouble, label: "Studio / Flat" },
  { id: "items", icon: Package, label: "Single Items" },
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
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 mb-1">
        What are you moving?
      </h2>
      <p className="text-muted text-sm mb-6">
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
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selected ? "bg-primary/10" : "bg-gray-100"
                }`}
              >
                <type.icon
                  className={`w-6 h-6 transition-colors ${
                    selected ? "text-primary" : "text-gray-500"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-semibold ${
                  selected ? "text-primary" : "text-gray-900"
                }`}
              >
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <button
        onClick={handleContinue}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
