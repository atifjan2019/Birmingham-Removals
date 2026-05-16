"use client";

import dynamic from "next/dynamic";

// The reviews carousel is genuinely interactive (slider state) and pulls in
// framer-motion. Load it client-side only, after the page is interactive, so
// none of it is in the initial bundle. A min-height placeholder reserves the
// space to avoid layout shift.
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => (
    <section className="py-24 sm:py-28 bg-slate-50 min-h-[640px]" aria-hidden="true" />
  ),
});

export default function TestimonialsLazy() {
  return <Testimonials />;
}
