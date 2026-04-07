"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Shield, Star, Award } from "lucide-react";
import Image from "next/image";
import Step1MoveType from "./Step1MoveType";
import Step2Bedrooms from "./Step2Bedrooms";
import Step2FromPostcode from "./Step2FromPostcode";
import Step3ToPostcode from "./Step3ToPostcode";
import Step4MoveDate from "./Step4MoveDate";
import Step5Loading from "./Step5Loading";
import Step6LeadCapture from "./Step6LeadCapture";
import Step7Success from "./Step7Success";

// Steps: 1=MoveType, 2=Bedrooms(conditional), 3=FromPostcode, 4=ToPostcode, 5=MoveDate, 6=Loading, 7=LeadCapture, 8=Success
const TOTAL_VISIBLE_STEPS = 7; // excluding loading & success

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
  const router = useRouter();
  const typeParam = searchParams.get("type");
  const hasValidType =
    typeParam && ["house", "office", "flat", "items"].includes(typeParam);

  // For house/flat with type param, start at bedrooms (step 2). For office/items, skip to step 3.
  const getInitialStep = () => {
    if (!hasValidType) return 1;
    if (typeParam === "house" || typeParam === "flat") return 2;
    return 3; // office/items skip bedrooms
  };

  const [step, setStep] = useState(getInitialStep());
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState({
    moveType: hasValidType ? typeParam : "",
    bedrooms: 1,
    fromPostcode: "",
    toPostcode: "",
    moveDate: "",
    flexibleDates: false,
    fullName: "",
    phone: "",
  });

  const needsBedrooms = data.moveType === "house" || data.moveType === "flat";

  const goNext = () => {
    setDirection(1);
    // Clean up URL param when leaving step 1 — update to reflect actual selection
    if (step === 1 && data.moveType) {
      router.replace(`/quote?type=${data.moveType}`, { scroll: false });
    }
    setStep((s) => {
      let next = s + 1;
      // Skip bedrooms step if not needed
      if (next === 2 && !needsBedrooms) next = 3;
      return next;
    });
  };

  const goBack = () => {
    setDirection(-1);
    // When going back to step 1, clear the URL param
    if (step === 2 || (step === 3 && !needsBedrooms)) {
      router.replace("/quote", { scroll: false });
    }
    setStep((s) => {
      let prev = s - 1;
      // Skip bedrooms step going back if not needed
      if (prev === 2 && !needsBedrooms) prev = 1;
      return Math.max(1, prev);
    });
  };

  const update = (fields) => setData((prev) => ({ ...prev, ...fields }));

  // Calculate progress (exclude loading step from count)
  const getProgressPercent = () => {
    const totalSteps = needsBedrooms ? 7 : 6;
    let currentStep = step;
    if (!needsBedrooms && step >= 3) currentStep = step - 1;
    if (step >= 6) currentStep = Math.min(currentStep, totalSteps); // loading doesn't count extra
    return Math.min(Math.round((currentStep / totalSteps) * 100), 100);
  };

  const getStepLabel = () => {
    const totalSteps = needsBedrooms ? 7 : 6;
    let currentStep = step;
    if (!needsBedrooms && step >= 3) currentStep = step - 1;
    if (step === 6) return ""; // loading step
    if (step === 7) return "Almost there";
    if (step === 8) return "";
    return `Step ${currentStep} of ${totalSteps}`;
  };

  const progressPercent = getProgressPercent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex flex-col">
      {/* Mini header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
          <a href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Newcastle Removals - Newcastle upon Tyne"
              width={180}
              height={58}
              className="h-10 w-auto"
              priority
            />
          </a>
          <a
            href="tel:+447888862003"
            className="flex items-center gap-1.5 text-muted hover:text-gray-900 transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">0788 886 2003</span>
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-200/40 overflow-hidden">
            {/* Progress bar */}
            {step <= 7 && step !== 6 && (
              <div className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">
                    {getStepLabel()}
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
                    <Step2Bedrooms
                      bedrooms={data.bedrooms}
                      onChange={(v) => update({ bedrooms: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 3 && (
                    <Step2FromPostcode
                      value={data.fromPostcode}
                      onChange={(v) => update({ fromPostcode: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 4 && (
                    <Step3ToPostcode
                      value={data.toPostcode}
                      fromPostcode={data.fromPostcode}
                      onChange={(v) => update({ toPostcode: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 5 && (
                    <Step4MoveDate
                      date={data.moveDate}
                      flexible={data.flexibleDates}
                      onChangeDate={(v) => update({ moveDate: v })}
                      onChangeFlexible={(v) => update({ flexibleDates: v })}
                      onNext={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 6 && (
                    <Step5Loading
                      fromPostcode={data.fromPostcode}
                      moveDate={data.moveDate}
                      onComplete={goNext}
                    />
                  )}
                  {step === 7 && (
                    <Step6LeadCapture
                      data={data}
                      onChange={update}
                      onSubmit={goNext}
                      onBack={goBack}
                    />
                  )}
                  {step === 8 && <Step7Success data={data} />}
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
