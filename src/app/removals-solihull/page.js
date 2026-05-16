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
  title: "Removals Solihull",
  description:
    "Premium removals in Solihull B91–B93. Fully insured removal company covering Touchwood, Tudor Grange, Olton & Monkspath. Expert service. Free quote today.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-solihull" },
  openGraph: {
    title: "Removals Solihull | Birmingham Removals",
    description:
      "Premium removals in Solihull B91–B93. Fully insured removal company covering Touchwood, Tudor Grange, Olton & Monkspath. Expert service.",
    type: "website",
    images: [{ url: "https://www.birminghamremovals.uk/og-image.jpg", width: 1200, height: 630 }],
    url: "https://www.birminghamremovals.uk/removals-solihull",
  },
  twitter: { card: "summary_large_image" },
};

const services = [
  {
    icon: Home,
    name: "House Removals Solihull",
    desc: "Premium house removals across Solihull B91, B92 and B93 — from Edwardian semis in Olton to large executive detached homes in Monkspath and Tudor Grange.",
  },
  {
    icon: Building2,
    name: "Luxury & Executive Moves",
    desc: "Specialist removals for high-value Solihull properties — careful handling of bespoke furniture, antiques, art and oversized items in premium homes throughout B91–B93.",
  },
  {
    icon: Truck,
    name: "Man and Van Solihull",
    desc: "Reliable, vetted man and van in Solihull for smaller loads, storage transfers and quick relocations across B91, B92 and B93 and into neighbouring Shirley and Knowle.",
  },
  {
    icon: Building2,
    name: "Office Removals Solihull",
    desc: "Professional office and commercial removals for Solihull town centre businesses, Lode Lane offices and tech park units — flexible scheduling to suit your operation.",
  },
  {
    icon: Package,
    name: "Full Packing Service",
    desc: "White-glove packing for Solihull moves — every item documented, wrapped and crated to the standard expected in one of the West Midlands&apos; most prestigious postcodes.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Secure, climate-controlled storage alongside your Solihull removal — chain-break solutions, downsizer storage and temporary storage for renovation moves.",
  },
];

const whyUs = [
  {
    title: "Solihull Property Specialists",
    desc: "We operate across B91–B93 regularly — from the Edwardian bay-fronted semis of Olton to the gated new-build estates of Monkspath. We know every road, access point and parking restriction.",
  },
  {
    title: "Fully Insured to Premium Standards",
    desc: "£10m goods-in-transit and £5m public liability on every Solihull job. High-value items documented with photographs before loading — full accountability throughout.",
  },
  {
    title: "Premium Service, Transparent Pricing",
    desc: "Our Solihull quotes are detailed, written and fixed. The high-quality service we deliver in B91–B93 comes without the inflated prices charged by some &apos;luxury&apos; removal operators.",
  },
  {
    title: "Trusted by Solihull Residents",
    desc: "A consistently 4.9-star rated service across all Birmingham and Solihull postcodes. Solihull customers return to us for subsequent moves and recommend us to neighbours because the service genuinely matches the standard they expect.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Solihull cost?",
    a: "A 3–4 bedroom Solihull house move typically costs £600–£1,200. Large detached homes in Monkspath or Tudor Grange with outbuildings and double garages are quoted individually after a video or in-person assessment. Smaller flat and man and van moves in B91–B93 start from £150. Free, fixed quotes returned within 30 minutes.",
  },
  {
    q: "Do you cover the Solihull postcodes B91, B92 and B93?",
    a: "Yes — all of B91 (Solihull town centre, Olton, Elmdon), B92 (Sheldon, Marston Green, Elmdon Heath) and B93 (Dorridge, Knowle, Bentley Heath). We also regularly move clients between Solihull and Birmingham postcodes including B28, B14 and B23 as single-quote, single-crew jobs.",
  },
  {
    q: "Can you move from a new-build estate in Monkspath, Solihull?",
    a: "Yes — Monkspath is one of Solihull&apos;s most active areas for us. The estates here (including Monkspath Hall Road, Stratford Road corridor south of Shirley and the newer Bellway and Redrow sites) have specific access arrangements including shared drives, allocated visitor parking and sometimes lift or stair-only access. We co-ordinate with your developer or estate management in advance.",
  },
  {
    q: "Do you offer same-day removals in Solihull?",
    a: "For man and van moves in B91–B93, same-day availability is possible — call before midday. Full house removals in Solihull typically require 48–72 hours&apos; planning to assign the appropriate crew size, vehicle and access arrangements.",
  },
  {
    q: "Can you move us near Birmingham Airport (BHX) or the NEC in Solihull?",
    a: "Yes — the Birmingham Airport (BHX) area (B26/B40) and the National Exhibition Centre sit just outside the core B91–B93 postcodes but are within our standard coverage area. We move clients in and around the airport employment corridor, the NEC catchment and the B37 Birmingham Business Park area with no surcharge.",
  },
];

export default async function RemovalsSolihullPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Solihull",
    url: "https://www.birminghamremovals.uk/removals-solihull",
    telephone: "+441216660000",
    areaServed: "Solihull, West Midlands",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Solihull",
      addressLocality: "Solihull",
      postalCode: "B91",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.4128, longitude: -1.7782 },
    image: "https://www.birminghamremovals.uk/images/logo.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
    },
    priceRange: "£££",
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
            Serving Solihull B91–B93 — Touchwood to Monkspath & Olton
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Solihull</span>, West Midlands
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals provides premium, fully insured house and office removals across
            Solihull B91, B92 and B93. From Edwardian semis in Olton to executive new-builds in
            Monkspath and Tudor Grange, our experienced, DBS-checked crew delivers the professional
            moving service that Solihull&apos;s high-value property market demands.
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">What We Do</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Our Removal Services in Solihull
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">Every service delivered by our experienced crew — no agency staff, no subcontracting.</p>
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">Local Knowledge</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Moving to or from Solihull?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Solihull covers the B91, B92 and B93 postcodes in the West Midlands metropolitan
              borough, sitting approximately 8 miles south-east of Birmingham city centre. It
              is one of the most prosperous local authority areas in England outside London,
              consistently ranking in the top 10 for average household income, educational
              attainment and quality of life. The town centre at Solihull High Street — anchored
              by the Touchwood Shopping Centre and Solihull School, one of the Midlands&apos;
              leading independent schools — is a compact, affluent retail and commercial hub.
              Tudor Grange Park and Malvern Park provide generous open space within walking
              distance of the centre.
            </p>
            <p>
              The property market in Solihull is one of the strongest in the West Midlands.
              In Olton (B91 south), the streets of Edwardian and interwar semis attract families
              seeking good-value period homes close to Olton railway station (connecting to
              Birmingham Moor Street and London Marylebone via Chiltern Railways). In Monkspath
              — on the southern edge of B91 — premium new-build estates of four and five-bedroom
              executive homes have transformed what was countryside into one of the region&apos;s
              most sought-after family addresses. Our removal company Solihull teams understand
              each sub-area&apos;s distinct property type and access requirements.
            </p>
            <p>
              Solihull&apos;s proximity to Birmingham Airport (BHX, B26) and the National
              Exhibition Centre (NEC, B40) makes it a preferred base for corporate relocations
              and international moves — professionals moving to the area for roles at BHX,
              Jaguar Land Rover, KPMG or other major employers based in the M42 corridor
              regularly use our service. We handle both one-way international arrivals into
              Solihull (co-ordinating with UK port of entry customs clearance) and outbound
              moves from Solihull to other regions or abroad. Solihull Metropolitan Borough
              Council&apos;s{" "}
              <a
                href="https://www.solihull.gov.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                official website
              </a>
              {" "}provides information for new residents registering with local services.
            </p>
            <p>
              Solihull railway station (Warwick Road) connects directly to Birmingham Moor Street
              and Birmingham New Street (10–15 minutes), providing excellent commuter access for
              those moving to Solihull for quality of life while still working in the city. The
              Warwick Road (A41) and Lode Lane (A41) are the primary road connections north to
              the M42 and south into Shirley and beyond. Moves between Solihull and{" "}
              <Link href="/removals-hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>
              {" "}and{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>
              {" "}are among our most frequent cross-boundary moves — quoted as a single job
              with one crew and our full insurance cover.
            </p>
            <p>
              Whether you&apos;re moving into a new Monkspath executive home, relocating from
              an Olton Edwardian semi or making a cross-city move between Solihull and{" "}
              <Link href="/removals-sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link>
              {" "}or{" "}
              <Link href="/removals-erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>
              , Birmingham Removals provides the premium, fully insured service you expect.
              Get a free, fixed quote today.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">Why Us</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Why Choose Birmingham Removals in Solihull
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
              { icon: Clock, value: "7 Days", label: "Available" },
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">FAQs</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Removals Solihull — Frequently Asked Questions
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
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">Free Quote</span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-4">
            Get a Free Quote for Removals in Solihull
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your Solihull postcode, move date and property details and we&apos;ll return
            a detailed, fixed quote within 30 minutes. No call centres — direct to your move team.
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
