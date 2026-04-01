"use client";

import { useState } from "react";
import { Calendar, ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function Step4MoveDate({
  date,
  flexible,
  onChangeDate,
  onChangeFlexible,
  onNext,
  onBack,
}) {
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!date && !flexible) {
      setError("Please select a date or tick flexible dates");
      return;
    }
    setError("");
    onNext();
  };

  const today = new Date().toISOString().split("T")[0];

  // Generate next 30 days for custom date grid
  const generateDates = () => {
    const dates = [];
    const now = new Date();
    for (let i = 1; i <= 21; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const futureDates = generateDates();

  const formatDay = (d) =>
    d.toLocaleDateString("en-GB", { weekday: "short" }).slice(0, 3);
  const formatDate = (d) => d.getDate();
  const formatMonth = (d) =>
    d.toLocaleDateString("en-GB", { month: "short" });
  const toValue = (d) => d.toISOString().split("T")[0];

  return (
    <div>
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#F8FAFC] mb-1">
        When do you want to move?
      </h2>
      <p className="text-[#94A3B8] text-sm mb-6">
        Pick your preferred moving date.
      </p>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {futureDates.map((d, i) => {
          const val = toValue(d);
          const selected = date === val;
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          return (
            <button
              key={i}
              onClick={() => {
                onChangeDate(val);
                setError("");
              }}
              className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all duration-150 ${
                selected
                  ? "bg-[#2563EB] text-white"
                  : isWeekend
                  ? "bg-white/[0.02] text-[#94A3B8] hover:bg-white/[0.06]"
                  : "bg-white/[0.03] text-[#F8FAFC] hover:bg-white/[0.08]"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wide opacity-70">
                {formatDay(d)}
              </span>
              <span className="text-sm font-bold">{formatDate(d)}</span>
              {i === 0 || d.getDate() === 1 ? (
                <span className="text-[9px] opacity-50">{formatMonth(d)}</span>
              ) : (
                <span className="text-[9px] opacity-0">.</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {date && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20">
          <Calendar className="w-4 h-4 text-[#2563EB]" />
          <span className="text-[#F8FAFC] text-sm font-medium">
            {new Date(date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}

      {/* Flexible checkbox */}
      <button
        onClick={() => onChangeFlexible(!flexible)}
        className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
          flexible
            ? "border-[#2563EB] bg-[#2563EB]/10"
            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
        }`}
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
            flexible
              ? "border-[#2563EB] bg-[#2563EB]"
              : "border-white/20 bg-transparent"
          }`}
        >
          {flexible && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="text-[#F8FAFC] text-sm">
          Flexible on dates — show me all options
        </span>
      </button>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

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
          Find My Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
