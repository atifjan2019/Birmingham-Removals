"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";
import HeroPopup from "@/components/HeroPopup";

export default function Home() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuote={() => setPopupOpen(true)} />
      <Hero onOpenQuote={() => setPopupOpen(true)} />
      <TrustBar />
      <Services />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTAStrip onOpenQuote={() => setPopupOpen(true)} />
      <Footer />
      <HeroPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
