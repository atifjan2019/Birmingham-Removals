"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search, Home } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-[family-name:var(--font-space)] text-9xl font-bold text-gray-900 mb-4 tracking-tighter">
              404
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Oops! You seem to be lost.
            </h2>
            <p className="text-lg text-muted mb-12 max-w-lg mx-auto">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 w-full sm:w-auto justify-center"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
              >
                <Search className="w-5 h-5 text-muted" />
                View Sitemap
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
