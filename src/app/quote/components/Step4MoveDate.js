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
      <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 mb-1">
        When do you want to move?
      </h2>
      <p className="text-muted text-sm mb-6">
        Pick your preferred moving date.
      </p>

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
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : isWeekend
                  ? "bg-gray-100/50 text-gray-400 hover:bg-gray-100"
                  : "bg-gray-50 text-gray-900 hover:bg-gray-100"
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

      {date && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-gray-900 text-sm font-medium">
            {new Date(date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}

      <button
        onClick={() => onChangeFlexible(!flexible)}
        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
          flexible
            ? "border-primary bg-primary/5"
            : "border-gray-200 bg-gray-50/50 hover:bg-gray-50"
        }`}
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
            flexible
              ? "border-primary bg-primary"
              : "border-gray-300 bg-transparent"
          }`}
        >
          {flexible && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="text-gray-900 text-sm">
          Flexible on dates, show me all options
        </span>
      </button>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

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
          Find My Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
