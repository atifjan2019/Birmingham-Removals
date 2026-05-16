"use client";

import { createContext, useCallback, useContext, useState } from "react";
import dynamic from "next/dynamic";

// HeroPopup pulls in framer-motion. Mount it only on first open so neither
// the popup nor framer-motion are in the initial page bundle.
const HeroPopup = dynamic(() => import("@/components/HeroPopup"), {
  ssr: false,
});

const QuoteModalContext = createContext({ openQuote: null });

/**
 * Returns { openQuote } where openQuote is a function on pages wrapped in
 * <QuoteModalProvider>, or null elsewhere (callers fall back to a /quote link).
 */
export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export default function QuoteModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openQuote = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <QuoteModalContext.Provider value={{ openQuote }}>
      {children}
      {open && <HeroPopup open onClose={close} />}
    </QuoteModalContext.Provider>
  );
}
