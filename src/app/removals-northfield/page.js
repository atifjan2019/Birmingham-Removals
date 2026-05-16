import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import { getSiteSettings } from "@/lib/siteSettings";
import {
  MapPin, Home, Building2, Truck, Package, Warehouse,
  CheckCircle2, ShieldCheck, Star, Clock, BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Removals Northfield | Birmingham Removals",
  description:
    "Trusted removals in Northfield B31. Fully insured removal company covering Bristol Road South, Longbridge & surrounding estates. Affordable rates. Free quote today.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-northfield" },
  openGraph: {
    title: "Removals Northfield | Birmingham Removals",
    description:
      "Trusted removals in Northfield B31. Fully insured removal company covering Bristol Road South, Longbridge & surrounding estates. Affordable rates.",
    type: "website",
    url: "https://www.birminghamremovals.uk/removals-northfield",
  },
};

const services = [
  {
    icon: Home,
    name: "House Removals Northfield",
    desc: "Full house removals across Northfield B31 — 1930s and 1950s semis, post-war estates and the new Longbridge Village developments all handled with equal professionalism.",
  },
  {
    icon: Building2,
    name: "Flat Removals Northfield",
    desc: "Flat and apartment removals in Northfield — from ground-floor estate properties to modern Longbridge Village apartments with lift access and allocated parking.",
  },
  {
    icon: Truck,
    name: "Man and Van Northfield",
    desc: "Affordable man and van in Northfield for smaller loads, single-item moves and short-notice relocations throughout B31 and into neighbouring B29, B30 and B38.",
  },
  {
    icon: Building2,
    name: "Office Removals Northfield",
    desc: "Efficient office removals for Northfield businesses — including units in the Longbridge redevelopment and retail parks along Bristol Road South.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing in Northfield homes using professional materials. We supply all boxes, tape and wrapping — you don&apos;t need to source anything.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Flexible storage alongside your Northfield removal — particularly useful for downsizers and residents in the active Longbridge new-build market.",
  },
];

const whyUs = [
  {
    title: "Northfield & Longbridge Specialists",
    desc: "We know the estate roads of Northfield, the new access routes through Longbridge Village and the best loading spots off Bristol Road South — local knowledge that speeds up every move.",
  },
  {
    title: "Fully Insured as Standard",
    desc: "£10m goods-in-transit and £5m public liability on every Northfield job — protecting your belongings regardless of property type or size.",
  },
  {
    title: "Competitive, Fixed Pricing",
    desc: "Northfield is one of our most affordable service areas. Prices are fixed, quoted in writing and never change on move day — no hidden surprises.",
  },
  {
    title: "5-Star Rated Local Service",
    desc: "Our 4.9-star Google average reflects the consistency we deliver across south Birmingham. Northfield customers regularly book us again for friends and family moves.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Northfield cost?",
    a: "A 2–3 bedroom Northfield house move typically costs £300–£700. 1930s and 1950s semis with through-lounges and garage access are straightforward to quote. Longbridge new-builds with lift access are also easy to plan and are priced clearly. Free, fixed quotes within 30 minutes.",
  },
  {
    q: "Do you cover the Northfield postcode B31?",
    a: "Yes — we cover all of B31 including Northfield village, West Heath, Longbridge, Hanging Wythian Road area, California and the Bell Lane corridor. No travel surcharge applies to B31.",
  },
  {
    q: "Can you handle moves in the Longbridge development?",
    a: "Yes — Longbridge Village is a significant part of our Northfield workload. The development on the former MG Rover/Austin site has brought new apartments, townhouses and retail units with varied access arrangements. We're familiar with the road layout and parking allocation system on the site.",
  },
  {
    q: "Do you offer same-day removals in Northfield?",
    a: "Yes, subject to van availability. Northfield is well within our same-day coverage area. Call before midday and we&apos;ll confirm a slot for 1–3 room loads. Full house moves in B31 need 48 hours&apos; notice.",
  },
  {
    q: "Can you move from a 1930s semi in Northfield with a rear lane?",
    a: "Absolutely — 1930s semis in Northfield often have rear lanes serving back gardens and garages. We use these wherever it provides a shorter, easier route for large furniture. Our crew assesses the best access point on arrival and adjusts the plan to suit the property layout.",
  },
];

export default async function RemovalsNorthfieldPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Northfield",
    url: "https://www.birminghamremovals.uk/removals-northfield",
    telephone: "+441216660000",
    areaServed: "Northfield, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B31",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.4072, longitude: -1.9765 },
    image: "https://www.birminghamremovals.uk/images/logo.png",
    priceRange: "£",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar settings={settings} />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white">
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-[#F97316]/10 blur-3xl rounded-full" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur mb-5">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            Serving Northfield B31 — Longbridge to West Heath
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Northfield</span>, Birmingham
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals covers the whole of Northfield B31 — from the established 1930s
            residential streets around Northfield village to the growing Longbridge development
            and the West Heath estates. Fully insured, competitively priced and available 7 days
            a week, we&apos;re south Birmingham&apos;s most trusted removal company.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/quote" className="btn-accent inline-flex items-center gap-2 px-7 py-4 font-semibold rounded-full w-full sm:w-auto justify-center bg-[#F97316] hover:bg-[#EA580C] transition-colors text-white">
              Get Free Quote
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all w-full sm:w-auto justify-center backdrop-blur">
              Call or Message Us
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ── Services ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">What We Do</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Our Removal Services in Northfield
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">Every service delivered by our Birmingham-based crew — no agency staff, no subcontracting.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="p-7 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-[#F97316]/30 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4 group-hover:bg-[#F97316]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#F97316]" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-lg mb-2">{name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* ── Local Area ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">Local Knowledge</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Moving to or from Northfield?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Northfield occupies the B31 postcode in south-west Birmingham, approximately
              6 miles from the city centre along the Bristol Road South (A38). The area is
              one of the largest residential districts in south Birmingham, covering Northfield
              village, West Heath, California, Longbridge and Hanging Wythian. It is best
              known historically as the home of the Austin Motor Company — later British
              Leyland and MG Rover — whose massive plant at Longbridge employed tens of
              thousands of workers and directly shaped the residential expansion of B31
              throughout the 20th century.
            </p>
            <p>
              The housing stock in Northfield reflects this industrial and working-class
              history. The majority of properties in B31 are 1930s to 1960s semis and
              terraces — well-built, solid homes with through-lounges, rear gardens and,
              in many cases, garages or rear lane access. These are exactly the type of
              properties our removal company handles every day: practical homes where
              good access planning makes the difference between a smooth move and a
              stressful one. As your man and van Northfield service, we know which roads
              allow van parking, where the school-run bottlenecks hit and how to navigate
              Longbridge Road at peak times.
            </p>
            <p>
              The most significant change to Northfield&apos;s landscape in recent years is
              the Longbridge Village development — a major regeneration project on the
              former MG Rover/Austin site that has delivered hundreds of new homes,
              apartments, a shopping centre (The Square at Longbridge) and new road
              infrastructure. We have completed many removals in Longbridge Village since
              it opened, and we&apos;re familiar with the access routes, parking bay
              allocation and the site&apos;s internal road layout. If you&apos;re moving
              into a new Longbridge property, we can co-ordinate with your developer or
              estate manager on access arrangements.
            </p>
            <p>
              Northfield borders several areas we cover extensively. Families frequently
              move between Northfield and{" "}
              <Link href="/removals-selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link>
              {" "}(B29) to the north along Bristol Road,{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>
              {" "}(B14) to the east and Bournville (B30) to the north-east. The Lickey
              Hills Country Park in Bromsgrove, accessible via the A38 south of Longbridge,
              is a popular reason for families to settle in B31 — easy access to open countryside
              without leaving the Birmingham boundary. Birmingham City Council&apos;s{" "}
              <a
                href="https://www.birmingham.gov.uk/info/20076/parking/1101/parking_suspensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                parking suspension service
              </a>
              {" "}covers B31 — we apply on your behalf for any Northfield moves requiring
              dedicated loading space on controlled streets.
            </p>
            <p>
              Whether you&apos;re a first-time buyer moving into a Northfield semi, a family
              upsizing within B31 or a downsizer heading to a Longbridge Village apartment,
              Birmingham Removals provides the affordable, insured and professional removal
              service Northfield residents deserve. Contact us today for a free quote.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">Why Us</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Why Choose Birmingham Removals in Northfield
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUs.map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Star, value: "4.9★", label: "Google Rating" },
              { icon: ShieldCheck, value: "£10m", label: "Goods-in-Transit Cover" },
              { icon: BadgeCheck, value: "DBS", label: "Checked Crews" },
              { icon: Clock, value: "Same Day", label: "Available" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-5 rounded-xl bg-[#0B1E3F] text-white">
                <Icon className="w-6 h-6 text-[#F97316] mx-auto mb-2" />
                <p className="font-[family-name:var(--font-space)] font-extrabold text-xl">{value}</p>
                <p className="text-white/70 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">FAQs</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Removals Northfield — Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] hover:bg-slate-50 transition-colors">
                  <span>{q}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">Free Quote</span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-4">
            Get a Free Quote for Removals in Northfield
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your B31 postcode, move date and rough volume and we&apos;ll return a fixed,
            no-obligation quote within 30 minutes. Same-day slots often available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-colors shadow-lg shadow-[#F97316]/25 w-full sm:w-auto">
              Get a Free Quote
            </Link>
            <Link href="/areas" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-slate-300 text-[#0B1E3F] font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto">
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
