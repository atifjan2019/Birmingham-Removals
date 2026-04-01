"use client";

import { Suspense } from "react";
import QuoteFunnel from "./components/QuoteFunnel";

export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
          <div className="text-[#F8FAFC] text-lg">Loading...</div>
        </div>
      }
    >
      <QuoteFunnel />
    </Suspense>
  );
}
