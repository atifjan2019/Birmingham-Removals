"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProblemAware from "@/components/ProblemAware";
import Services from "@/components/Services";
import WhatsIncluded from "@/components/WhatsIncluded";
import Scenarios from "@/components/Scenarios";
import PricingLogic from "@/components/PricingLogic";
import AreasCovered from "@/components/AreasCovered";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";
import HeroPopup from "@/components/HeroPopup";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function HomeClient({ settings }) {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuote={() => setPopupOpen(true)} settings={settings} />
      <Hero onOpenQuote={() => setPopupOpen(true)} />
      <TrustBar />
      <ProblemAware />
      <Services />
      <WhatsIncluded />
      <Scenarios />
      <PricingLogic />
      <AreasCovered />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTAStrip onOpenQuote={() => setPopupOpen(true)} settings={settings} />
      <Footer settings={settings} />
      <HeroPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
      <StickyMobileCTA
        onOpenQuote={() => setPopupOpen(true)}
        settings={settings}
      />
    </>
  );
}
