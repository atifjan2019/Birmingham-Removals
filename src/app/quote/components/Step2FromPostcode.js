"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import PostcodeAutocomplete from "./PostcodeAutocomplete";

export default function Step2FromPostcode({ value, onChange, onNext, onBack }) {
  const [error, setError] = useState("");

  const handleChange = (val) => {
    onChange(val);
    setError("");
  };

  const handleContinue = () => {
    if (!value.trim()) {
      setError("Postcode is required");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div>
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 mb-1">
        Where are you moving from?
      </h2>
      <p className="text-muted text-sm mb-6">
        Enter the postcode of your current property.
      </p>

      <PostcodeAutocomplete
        value={value}
        onChange={handleChange}
        placeholder="e.g. B15 3DH"
        autoFocus
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted hover:text-gray-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
