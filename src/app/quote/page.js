import { Suspense } from "react";
import Link from "next/link";
import QuoteFunnel from "./components/QuoteFunnel";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import { getSiteSettings, telHref } from "@/lib/siteSettings";
import { BUSINESS } from "@/config/business";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export default async function QuotePage() {
  const settings = await getSiteSettings();
  const phoneHref = telHref(settings.phone || BUSINESS.phoneDisplay);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: BUSINESS.url },
    { name: "Get a Free Quote", url: `${BUSINESS.url}/quote` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
            <div className="text-[#F8FAFC] text-lg">Loading...</div>
          </div>
        }
      >
        <QuoteFunnel settings={settings} />
      </Suspense>

      {/* SEO content block (rendered after the interactive funnel) */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
            Get a free removals quote in Birmingham
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Tell us about your move and we&apos;ll reply with a fixed-price,
            no-obligation quote within 30 minutes. We cover Birmingham and the wider
            West Midlands, including Solihull, Sutton Coldfield, Dudley,
            Wolverhampton and Coventry.
          </p>

          <h2 className="mt-10 font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F]">
            What to share when you request a quote
          </h2>
          <ul className="mt-3 space-y-2 text-slate-700 text-base list-disc pl-6">
            <li>From and to postcodes (and floor / lift access if applicable)</li>
            <li>Preferred move date, and whether a weekend or evening is needed</li>
            <li>Property size (studio, 1-bed, 2-bed, 3-bed, 4-bed+, office)</li>
            <li>Rough volume: number of large items, boxes and special items</li>
            <li>Any access challenges: stairs, narrow doorways, parking restrictions</li>
          </ul>

          <h2 className="mt-10 font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F]">
            What affects the price
          </h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Birmingham removals are priced on volume, distance and access, not by the
            hour. A 1-bed flat with lift access in B1 will cost less than a 3-bed
            semi with a long path and a piano. Fixed quotes mean the figure you see
            is the figure you pay, with no surprise add-ons on move day.
          </p>

          <h2 className="mt-10 font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F]">
            Other ways to reach us
          </h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Prefer to speak to a person? Call{" "}
            <a
              href={phoneHref}
              className="text-[#F97316] font-semibold hover:underline"
            >
              {BUSINESS.phoneDisplay}
            </a>{" "}
            (Monday to Sunday, 7am–9pm) or email{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-[#F97316] font-semibold hover:underline"
            >
              {BUSINESS.email}
            </a>
            . You can also browse{" "}
            <Link href="/services" className="text-[#F97316] font-semibold hover:underline">
              our services
            </Link>{" "}
            or check{" "}
            <Link href="/areas" className="text-[#F97316] font-semibold hover:underline">
              the areas we cover
            </Link>
            .
          </p>

          <p className="mt-6 text-xs text-slate-500 uppercase tracking-wider">
            No call centres · No pushy sales · DBS-checked Birmingham crews
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
