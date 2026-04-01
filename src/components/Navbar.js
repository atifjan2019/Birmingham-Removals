"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-[family-name:var(--font-space)] font-bold text-lg text-gray-900">
                Newcastle Removals
              </span>
              <span className="hidden sm:block text-xs text-muted -mt-1">
                Newcastle upon Tyne
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            {onOpenQuote ? (
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Get Free Quote
              </button>
            ) : (
              <a
                href="/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Get Free Quote
              </a>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:07943480432"
              className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4 text-primary" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/60"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg text-muted hover:text-gray-900 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              {onOpenQuote ? (
                <button
                  onClick={() => { setMobileOpen(false); onOpenQuote(); }}
                  className="block w-full text-center px-5 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Get Free Quote
                </button>
              ) : (
                <a
                  href="/quote"
                  className="block w-full text-center px-5 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Get Free Quote
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
