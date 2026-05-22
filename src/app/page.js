import { getSiteSettings } from "@/lib/siteSettings";
import QuoteModalProvider from "@/components/QuoteModalProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhoWeAre from "@/components/WhoWeAre";
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
import JsonLd from "@/components/seo/JsonLd";
import { howToSchema } from "@/lib/schema";

const bookingHowTo = howToSchema([
  {
    name: "Tell us the details",
    text: "Share your postcodes, your moving date and what needs to move. It takes about 2 minutes online or one quick phone call.",
  },
  {
    name: "Get a fixed quote",
    text: "Receive a transparent, all-in price within 30 minutes. There are no hidden fees and no guesswork.",
  },
  {
    name: "Book your date",
    text: "Pick the slot that suits you, whether that is a weekday, weekend or evening. Same-day slots are often available.",
  },
  {
    name: "Moving day, sorted",
    text: "Our uniformed, DBS-checked crew arrives on time and gets you safely into your new Birmingham address.",
  },
]);

// Server component. Only Navbar / HeroQuoteForm / CTAStrip / StickyMobileCTA /
// the lazy reviews carousel ship JS; the rest is static server-rendered HTML so
// the LCP headline paints without waiting for the bundle.
export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <QuoteModalProvider>
      <JsonLd data={bookingHowTo} />
      <Navbar settings={settings} />
      <Hero />
      <TrustBar />
      <WhoWeAre />
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
