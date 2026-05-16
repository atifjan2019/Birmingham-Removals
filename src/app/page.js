import { getSiteSettings } from "@/lib/siteSettings";
import QuoteModalProvider from "@/components/QuoteModalProvider";
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
import TestimonialsLazy from "@/components/TestimonialsLazy";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

// Server component. Only Navbar / HeroQuoteForm / CTAStrip / StickyMobileCTA /
// the lazy reviews carousel ship JS; the rest is static server-rendered HTML so
// the LCP headline paints without waiting for the bundle.
export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <QuoteModalProvider>
      <Navbar settings={settings} />
      <Hero />
      <TrustBar />
      <ProblemAware />
      <Services />
      <WhatsIncluded />
      <Scenarios />
      <PricingLogic />
      <AreasCovered />
      <HowItWorks />
      <WhyUs />
      <TestimonialsLazy />
      <FAQ />
      <CTAStrip settings={settings} />
      <Footer settings={settings} />
      <StickyMobileCTA settings={settings} />
    </QuoteModalProvider>
  );
}
