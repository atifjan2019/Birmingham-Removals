"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

const NE_AREAS = [
  { code: "NE1", area: "Newcastle City Centre" },
  { code: "NE2", area: "Jesmond / Sandyford" },
  { code: "NE3", area: "Gosforth / Fawdon" },
  { code: "NE4", area: "Benwell / Elswick" },
  { code: "NE6", area: "Heaton / Walker" },
  { code: "NE8", area: "Gateshead" },
  { code: "NE12", area: "Longbenton / Killingworth" },
  { code: "NE15", area: "Lemington / Newburn" },
];

const UK_POSTCODE_REGEX = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/;

export default function Step2FromPostcode({ value, onChange, onNext, onBack }) {
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = (val) => {
    const upper = val.toUpperCase();
    onChange(upper);
    setError("");

    if (upper.length >= 2) {
      const matches = NE_AREAS.filter((a) =>
        a.code.startsWith(upper.replace(/\s+/g, "").slice(0, 4))
      );
      setSuggestions(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const selectSuggestion = (code) => {
    onChange(code + " ");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleContinue = () => {
    if (!value.trim()) {
      setError("Postcode is required");
      return;
    }
    if (!UK_POSTCODE_REGEX.test(value.trim())) {
      setError("Enter a valid UK postcode");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div>
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#F8FAFC] mb-1">
        Where are you moving from?
      </h2>
      <p className="text-[#94A3B8] text-sm mb-6">
        Enter the postcode of your current property.
      </p>

      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
        <input
          ref={inputRef}
          type="text"
          placeholder="e.g. NE1 4XF"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[#F8FAFC] text-lg placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
        />

        {/* Dropdown suggestions */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-2 left-0 right-0 bg-[#141B2D] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl"
          >
            {suggestions.map((s) => (
              <button
                key={s.code}
                onClick={() => selectSuggestion(s.code)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-[#F8FAFC] font-semibold text-sm">
                    {s.code}
                  </span>
                  <span className="text-[#94A3B8] text-sm ml-2">
                    — {s.area}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#2563EB]/90 transition-all"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
