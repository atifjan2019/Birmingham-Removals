"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Areas", href: "/areas" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top contact strip */}
      <div className="hidden md:block bg-[#0B1E3F] text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex items-center justify-between">
          <span className="opacity-80">
            Birmingham&apos;s 5-star removals company — serving the West Midlands since 2015
          </span>
          <div className="flex items-center gap-5">
            <a href="tel:+447365380090" className="flex items-center gap-1.5 hover:text-[#F97316] transition-colors">
              <Phone className="w-3 h-3" /> 07365 380090
            </a>
            <a href="mailto:info@birminghamremovals.uk" className="hover:text-[#F97316] transition-colors">
              info@birminghamremovals.uk
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : "bg-white border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] flex items-center justify-center shadow-md">
                <span className="font-[family-name:var(--font-space)] font-extrabold text-white text-lg">B</span>
              </div>
              <div className="leading-tight">
                <div className="font-[family-name:var(--font-space)] font-extrabold text-[#0B1E3F] text-lg">
                  Birmingham <span className="text-[#F97316]">Removals</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">
                  West Midlands · Since 2015
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-[#F97316] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+447365380090"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-[#0B1E3F] text-sm font-semibold hover:border-[#F97316] hover:text-[#F97316] transition-colors"
              >
                <Phone className="w-4 h-4" />
                07365 380090
              </a>
              {onOpenQuote ? (
                <button
                  onClick={onOpenQuote}
                  className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full cursor-pointer"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/quote"
                  className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:+447365380090"
                className="w-10 h-10 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4 text-[#F97316]" />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-slate-700"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-white border-b border-slate-200"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium text-slate-700 hover:text-[#F97316] py-3 border-b border-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
                {onOpenQuote ? (
                  <button
                    onClick={() => { setMobileOpen(false); onOpenQuote(); }}
                    className="mt-4 btn-accent block w-full text-center px-5 py-3 font-semibold rounded-full"
                  >
                    Get Free Quote
                  </button>
                ) : (
                  <Link
                    href="/quote"
                    className="mt-4 btn-accent block w-full text-center px-5 py-3 font-semibold rounded-full"
                  >
                    Get Free Quote
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
