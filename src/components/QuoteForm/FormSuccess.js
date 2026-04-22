"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";

export default function FormSuccess() {
  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      const fire = confetti.default;
      fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#BC2436", "#E8485A", "#10B981", "#F8FAFC"],
      });
      setTimeout(() => {
        fire({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#BC2436", "#E8485A", "#10B981"],
        });
        fire({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#BC2436", "#E8485A", "#10B981"],
        });
      }, 300);
    });
  }, []);

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="w-24 h-24 rounded-full bg-success/10 border-2 border-success/30 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-12 h-12 text-success" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-[family-name:var(--font-space)] text-3xl font-bold mb-3 text-gray-900"
      >
        Quote Request Sent!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-muted text-lg mb-8 max-w-md mx-auto"
      >
        Thanks for getting in touch. One of our team will call you within{" "}
        <strong className="text-gray-900">2 hours</strong> to confirm your
        quote and answer any questions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 max-w-sm mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Phone className="w-5 h-5 text-primary" />
          <span className="font-semibold text-gray-900">
            Need us sooner?
          </span>
        </div>
        <p className="text-muted text-sm mb-4">
          Call us directly and we&apos;ll give you an instant quote over the
          phone.
        </p>
        <a
          href="tel:+447365380090"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all"
        >
          <Phone className="w-4 h-4" />
          07365 380090
        </a>
      </motion.div>
    </div>
  );
}
