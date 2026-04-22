import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "FAQ — Birmingham Removals | Prices, Insurance, Booking Questions",
  description:
    "Common questions about Birmingham removals: prices, booking times, insurance, storage, payment and more. Still not sure? Call us on 07365 380090.",
  alternates: { canonical: "https://www.birminghamremovals.uk/faq" },
};

export default function FAQPage() {
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
        <CTAStrip />
      </main>
      <Footer />
    </>
  );
}
