"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Phone, Shield, Star, Award } from "lucide-react";
import Step1MoveType from "./Step1MoveType";
import Step2FromPostcode from "./Step2FromPostcode";
import Step3ToPostcode from "./Step3ToPostcode";
import Step4MoveDate from "./Step4MoveDate";
import Step5Loading from "./Step5Loading";
import Step6LeadCapture from "./Step6LeadCapture";
import Step7Success from "./Step7Success";

const TOTAL_STEPS = 6;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const trustItems = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "500+ Moves" },
  { icon: Award, label: "5-Star Rated" },
];

export default function QuoteFunnel() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState({
    moveType: "",
    fromPostcode: "",
    toPostcode: "",
    moveDate: "",
    flexibleDates: false,
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    if (typeParam && ["house", "office", "flat", "items"].includes(typeParam)) {
      setData((prev) => ({ ...prev, moveType: typeParam }));
    }
  }, [typeParam]);

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const update = (fields) => setData((prev) => ({ ...prev, ...fields }));

  const progressPercent = step <= 5 ? (Math.min(step, 4) / TOTAL_STEPS) * 100 : step === 6 ? 80 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex flex-col">
      {/* Mini header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Truck className="w-4 h-4 text-primary" />
            </div>
            <span className="font-[family-name:var(--font-space)] font-bold text-gray-900 text-sm">
              Swift Removals
            </span>
          </a>
          <a
            href="tel:01911234567"
            className="flex items-center gap-1.5 text-muted hover:text-gray-900 transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">0191 123 4567</span>
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-200/40 overflow-hidden">
            {/* Progress bar */}
            {step <= 6 && step !== 5 && (
              <div className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">
                    {step <= 4
                      ? `Step ${step} of ${TOTAL_STEPS}`
                      : step === 6
                      ? "Almost there"
                      : ""}
                  </span>
                  <span className="text-xs text-primary font-semibold">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Step content */}
            <div className="p-6 min-h-[380px] overflow-hidden relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {step === 1 && (
                    <Step1MoveType
                      value={data.moveType}
                      onChange={(v) => update({ moveType: v })}
                      onNext={goNext}
                    />
                  )}
                  {step === 2 && (
                    <Step2FromPostcode
                      value={data.fromPostcode}
                      onChange={(v) => update({ fromPostcode: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 3 && (
                    <Step3ToPostcode
                      value={data.toPostcode}
                      fromPostcode={data.fromPostcode}
                      onChange={(v) => update({ toPostcode: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 4 && (
                    <Step4MoveDate
                      date={data.moveDate}
                      flexible={data.flexibleDates}
                      onChangeDate={(v) => update({ moveDate: v })}
                      onChangeFlexible={(v) => update({ flexibleDates: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 5 && (
                    <Step5Loading
                      fromPostcode={data.fromPostcode}
                      moveDate={data.moveDate}
                      onComplete={goNext}
                    />
                  )}
                  {step === 6 && (
                    <Step6LeadCapture
                      data={data}
                      onChange={update}
                      onSubmit={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 7 && <Step7Success data={data} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Trust icons */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
