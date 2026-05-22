import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";
import { getSiteSettings } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";

export const metadata = makeMeta({
  title: "Removals FAQ: Prices, Insurance & Booking | Birmingham Removals",
  absoluteTitle: true,
  description:
    "Common questions about Birmingham removals: pricing, booking lead time, insurance, packing, storage and same-day moves. Still unsure? Call us today.",
  keywords: [
    "Birmingham removals FAQ",
    "removals cost Birmingham",
    "removals insurance Birmingham",
    "how to book removals Birmingham",
    "removal company questions",
  ],
  path: "/faq",
});

export default async function FAQPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider mb-5">
              FAQ
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Your <span className="text-[#F97316]">Birmingham removals</span> questions, answered
            </h1>
          </div>
        </section>
        <FAQ />
        <CTAStrip settings={settings} />
      </main>
      <Footer />
    </>
  );
}
