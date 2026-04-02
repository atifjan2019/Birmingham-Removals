"use client";

import { BedDouble, Minus, Plus, ArrowRight, ArrowLeft } from "lucide-react";

export default function Step2Bedrooms({ bedrooms, onChange, onNext, onBack }) {
  const adjust = (delta) => {
    const next = Math.max(0, Math.min(6, (bedrooms || 1) + delta));
    onChange(next);
  };

  return (
    <div>
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 mb-1">
        How many bedrooms?
      </h2>
      <p className="text-muted text-sm mb-8">
        This helps us estimate the right van size and team for your move.
      </p>

      <div className="flex items-center justify-center gap-6 py-6">
        <button
          type="button"
          onClick={() => adjust(-1)}
          className="w-14 h-14 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
        >
          <Minus className="w-5 h-5 text-muted" />
        </button>

        <div className="text-center min-w-[120px]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <BedDouble className="w-6 h-6 text-primary" />
            <span className="font-[family-name:var(--font-space)] text-4xl font-bold text-gray-900">
              {bedrooms === 0
                ? "Studio"
                : bedrooms >= 6
                ? "6+"
                : bedrooms || 1}
            </span>
          </div>
          <span className="text-sm text-muted">
            {bedrooms === 0
              ? "studio / bedsit"
              : bedrooms === 1
              ? "bedroom"
              : "bedrooms"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => adjust(1)}
          className="w-14 h-14 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5 text-muted" />
        </button>
      </div>

      {/* Quick select buttons */}
      <div className="flex items-center gap-3 mt-6">
        {[0, 1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all cursor-pointer ${
              bedrooms === num
                ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/10"
                : "border-gray-200 bg-gray-50/50 text-gray-600 hover:border-primary/50"
            }`}
          >
            {num === 0 ? "Studio" : num}{num === 5 ? "+" : ""}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-muted hover:text-gray-900 transition-colors text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
