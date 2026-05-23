import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { BreadcrumbBar } from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/siteSettings";
import { BUSINESS } from "@/config/business";
import {
  breadcrumbSchema,
  serviceAreaSchema,
  faqSchema,
} from "@/lib/schema";
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock,
  BadgeCheck,
} from "lucide-react";

const SERVICE_LINKS = [
  { slug: "house-removals", label: "House removals" },
  { slug: "office-removals", label: "Office removals" },
  { slug: "man-and-van", label: "Man and van" },
  { slug: "packing-service", label: "Packing service" },
  { slug: "storage-solutions", label: "Storage solutions" },
  { slug: "piano-and-specialist-items", label: "Piano & specialist items" },
];

export default async function AreaTemplate({
  slug,
  name,
  postcodes,
  heroIntro,
  openingParagraphs,
  services,
  localArea,
  whyUs,
  faqs,
  nearbyAreas,
  isDistantArea,
  priceRange = "££",
}) {
  const settings = await getSiteSettings();
  const url = `${BUSINESS.url}/areas/${slug}`;

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: BUSINESS.url },
      { name: "Areas", url: `${BUSINESS.url}/areas` },
      { name: name, url },
    ]),
    serviceAreaSchema(name, slug, postcodes),
    ...(Array.isArray(faqs) && faqs.length > 0 ? [faqSchema(faqs)] : []),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <Navbar settings={settings} />

      <BreadcrumbBar
        items={[
          { name: "Home", href: "/" },
          { name: "Areas", href: "/areas" },
          { name: name },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white">
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-[#F97316]/10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur mb-5">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            Serving {name}{postcodes ? ` (${postcodes})` : ""} and surrounding streets
          </span>

          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">{name}</span>
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            {heroIntro}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              href="/quote"
              className="btn-accent inline-flex items-center gap-2 px-7 py-4 font-semibold rounded-full w-full sm:w-auto justify-center bg-[#F97316] hover:bg-[#EA580C] transition-colors text-white"
            >
              Get Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all w-full sm:w-auto justify-center backdrop-blur"
            >
              Call or Message Us
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      {Array.isArray(openingParagraphs) && openingParagraphs.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-5 text-slate-700 leading-relaxed text-lg">
              {openingParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {isDistantArea ? (
                <p className="rounded-xl border border-[#F97316]/20 bg-[#F97316]/10 p-5 text-base text-slate-700">
                  We cover moves to and from {name} as part of our wider West Midlands and
                  nationwide service. Longer-distance jobs are planned as full-day work and
                  priced clearly upfront, with no hidden mileage charges added on the day.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {Array.isArray(services) && services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
                What We Do
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
                Our Removal Services in {name}
              </h2>
              <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                Every service delivered by our Birmingham-based crew, with no agency staff and no subcontracting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(({ icon: Icon, name: sName, desc, slug: serviceSlug }) => (
                <Link
                  key={sName}
                  href={serviceSlug ? `/services/${serviceSlug}` : "/services"}
                  className="p-7 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-[#F97316]/30 transition-all group"
                >
                  {Icon ? (
                    <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4 group-hover:bg-[#F97316]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#F97316]" />
                    </div>
                  ) : null}
                  <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-lg mb-2">
                    {sName}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <HowItWorks />

      {/* Local area knowledge */}
      {localArea && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
                Local Knowledge
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
                Local Knowledge — Moving in {name}
              </h2>
            </div>
            <div className="space-y-5 text-slate-700 leading-relaxed">{localArea}</div>
          </div>
        </section>
      )}

      {Array.isArray(nearbyAreas) && nearbyAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
                Nearby Areas
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
                Areas Near {name} We Also Cover
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="block rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-[#0B1E3F] hover:border-[#F97316] hover:bg-white hover:text-[#F97316] transition-colors"
                >
                  Removals in {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      {Array.isArray(whyUs) && whyUs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
                Why Us
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
                Why Choose Birmingham Removals in {name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {whyUs.map(({ title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] mb-1">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {[
                { icon: Star, value: "4.9★", label: "Google Rating" },
                { icon: ShieldCheck, value: "£10m", label: "Goods-in-Transit Cover" },
                { icon: BadgeCheck, value: "DBS", label: "Checked Crews" },
                { icon: Clock, value: "Same Day", label: "Available" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center p-5 rounded-xl bg-[#0B1E3F] text-white">
                  <Icon className="w-6 h-6 text-[#F97316] mx-auto mb-2" />
                  <p className="font-[family-name:var(--font-space)] font-extrabold text-xl">
                    {value}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Removal services in {city}, internal linking */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
              Services
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Removal services in {name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="block p-5 rounded-xl bg-white border border-slate-200 text-[#0B1E3F] font-semibold hover:border-[#F97316] hover:text-[#F97316] transition-colors"
              >
                {s.label} in {name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {Array.isArray(faqs) && faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
                FAQs
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
                Removals {name}: frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  open
                  className="group rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] hover:bg-white transition-colors">
                    <span>{q}</span>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-open:rotate-45 transition-transform text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-white">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">
            Free Quote
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-4">
            Get a free quote for removals in {name}
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your move date, {postcodes ? `${postcodes.split(",")[0].trim()} postcode` : "postcode"} and rough volume and
            we&apos;ll return a fixed, no-obligation quote within 30 minutes. No call centres, just direct
            access to the team running your move.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-colors shadow-lg shadow-[#F97316]/25 w-full sm:w-auto"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/areas"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-slate-300 text-[#0B1E3F] font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto"
            >
              View All Areas We Cover
            </Link>
          </div>
        </div>
      </section>

      <CTAStrip settings={settings} />
      <Footer settings={settings} />
    </>
  );
}
