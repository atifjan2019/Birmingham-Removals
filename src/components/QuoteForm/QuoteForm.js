"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  step1Schema,
  step2Schema,
  step4Schema,
} from "@/lib/formSchema";

import ProgressBar from "./ProgressBar";
import Step1MoveType from "./Step1MoveType";
import Step2Bedrooms from "./Step2Bedrooms";
import Step2Details from "./Step2Details";
import Step3Extras from "./Step3Extras";
import Step4Contact from "./Step4Contact";
import Step5Summary from "./Step5Summary";
import FormSuccess from "./FormSuccess";

const TOTAL_STEPS = 6;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    moveType: "",
    fromPostcode: "",
    toPostcode: "",
    moveDate: "",
    bedrooms: 2,
    extras: [],
    fullName: "",
    phone: "",
    email: "",
    referral: "",
  });

  // Bedrooms step only applies to house/studio moves
  const needsBedrooms = formData.moveType === "house" || formData.moveType === "studio";

  const validateStep = (stepNum) => {
    let schema;
    let data;

    switch (stepNum) {
      case 1:
        schema = step1Schema;
        data = { moveType: formData.moveType };
        break;
      case 2:
        // Bedrooms step — no schema needed, always valid
        return true;
      case 3:
        schema = step2Schema;
        data = {
          fromPostcode: formData.fromPostcode,
          toPostcode: formData.toPostcode,
          moveDate: formData.moveDate || new Date().toISOString().split("T")[0],
          bedrooms: formData.bedrooms,
        };
        break;
      case 4:
        // Extras — always valid
        return true;
      case 5:
        schema = step4Schema;
        data = {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          referral: formData.referral,
        };
        break;
      default:
        return true;
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    // Skip bedrooms step if not needed (office/single items)
    if (step === 1 && !needsBedrooms) {
      setStep(3);
    } else {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const goBack = () => {
    setDirection(-1);
    setErrors({});
    // Skip bedrooms step going back if not needed
    if (step === 3 && !needsBedrooms) {
      setStep(1);
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Calculate progress accounting for conditional step
  const getProgress = () => {
    const effectiveSteps = needsBedrooms ? TOTAL_STEPS : TOTAL_STEPS - 1;
    let effectiveStep = step;
    if (!needsBedrooms && step >= 3) {
      effectiveStep = step - 1;
    }
    return Math.min(effectiveStep, effectiveSteps);
  };

  if (submitted) {
    return (
      <section id="quote" className="py-24 sm:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 sm:p-10">
            <FormSuccess />
          </div>
        </div>
      </section>
    );
  }

  const effectiveSteps = needsBedrooms ? TOTAL_STEPS : TOTAL_STEPS - 1;

  return (
    <section id="quote" className="py-24 sm:py-32 relative bg-gray-50/50">
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
            Free Quote
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Get Your Instant Quote
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Fill in a few details and we&apos;ll get back to you with a
            competitive price within 30 minutes. No obligation.
          </p>
        </motion.div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8 md:p-10">
          <ProgressBar currentStep={getProgress()} totalSteps={effectiveSteps} />

          <div className="overflow-hidden relative min-h-[380px]">
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
                    value={formData.moveType}
                    onChange={(val) =>
                      setFormData({ ...formData, moveType: val })
                    }
                    error={errors.moveType}
                  />
                )}
                {step === 2 && (
                  <Step2Bedrooms
                    bedrooms={formData.bedrooms}
                    onChange={(val) =>
                      setFormData({ ...formData, bedrooms: val })
                    }
                  />
                )}
                {step === 3 && (
                  <Step2Details
                    data={formData}
                    onChange={(data) => setFormData({ ...formData, ...data })}
                    errors={errors}
                  />
                )}
                {step === 4 && (
                  <Step3Extras
                    selected={formData.extras}
                    onChange={(extras) =>
                      setFormData({ ...formData, extras })
                    }
                  />
                )}
                {step === 5 && (
                  <Step4Contact
                    data={formData}
                    onChange={(data) => setFormData({ ...formData, ...data })}
                    errors={errors}
                  />
                )}
                {step === 6 && (
                  <Step5Summary
                    formData={formData}
                    onSubmit={handleSubmit}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {step < 6 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-muted hover:text-gray-900 transition-colors text-sm font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                {step === 5 ? "Review Quote" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-muted hover:text-gray-900 transition-colors text-sm font-medium cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back & Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
