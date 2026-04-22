"use client";

import { useState } from "react";
import { Calendar, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";

export default function Step4MoveDate({
  date,
  flexible,
  fromPostcode,
  onChangeDate,
  onChangeFlexible,
  onNext,
  onBack,
}) {
  const postcodeArea = (() => {
    const cleaned = String(fromPostcode || "").trim().toUpperCase();
    if (!cleaned) return "";
    const match = cleaned.match(/^[A-Z]{1,2}\d[A-Z\d]?/);
    return match ? match[0] : cleaned.split(/\s+/)[0];
  })();
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
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i <= 21; i++) {
      const d = new Date(start);
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
      <p className="text-muted text-sm mb-4">
        Pick your preferred moving date.
      </p>

      {postcodeArea && (
        <div className="flex items-start gap-2 mb-5 px-3 py-2.5 rounded-lg bg-accent/10 border border-accent/30">
          <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 leading-relaxed">
            We limit to <strong className="text-gray-900">3 new bookings per day</strong> to guarantee quality service in <strong className="text-gray-900">{postcodeArea}</strong>.
          </p>
        </div>
      )}

      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {futureDates.map((d, i) => {
          const val = toValue(d);
          const selected = date === val;
          const isToday = i === 0;
          return (
            <button
              key={i}
              type="button"
              disabled={isToday}
              aria-disabled={isToday}
              title={isToday ? "Fully booked" : undefined}
              onClick={() => {
                if (isToday) return;
                onChangeDate(val);
                setError("");
              }}
              className={`relative flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all duration-150 ${
                isToday
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through opacity-60"
                  : selected
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-gray-50 text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wide opacity-70">
                {formatDay(d)}
              </span>
              <span className="text-sm font-bold">{formatDate(d)}</span>
              {isToday ? (
                <span className="text-[9px] font-semibold tracking-wide text-red-500 no-underline">
                  BOOKED
                </span>
              ) : i === 1 || d.getDate() === 1 ? (
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
