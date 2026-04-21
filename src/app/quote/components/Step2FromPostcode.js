"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

const NE_AREAS = [
  { code: "B1", area: "Birmingham City Centre" },
  { code: "B3", area: "Jewellery Quarter / Colmore" },
  { code: "B13", area: "Moseley / Billesley" },
  { code: "B14", area: "Kings Heath" },
  { code: "B15", area: "Edgbaston" },
  { code: "B17", area: "Harborne" },
  { code: "B23", area: "Erdington" },
  { code: "B29", area: "Selly Oak" },
  { code: "B74", area: "Sutton Coldfield" },
  { code: "B91", area: "Solihull" },
];

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

      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          ref={inputRef}
          type="text"
          placeholder="e.g. NE1 4XF"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
        />

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl overflow-hidden z-20 shadow-xl"
          >
            {suggestions.map((s) => (
              <button
                key={s.code}
                onClick={() => selectSuggestion(s.code)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-gray-900 font-semibold text-sm">
                    {s.code}
                  </span>
                  <span className="text-muted text-sm ml-2">- {s.area}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

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
