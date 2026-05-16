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
  title: "Removals Kings Heath | Birmingham Removals",
  description:
    "Reliable removals in Kings Heath B14. Fully insured removal company covering High Street, Kings Heath Park & Alcester Road South. 5-star rated. Free quote today.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-kings-heath" },
  openGraph: {
    title: "Removals Kings Heath | Birmingham Removals",
    description:
      "Reliable removals in Kings Heath B14. Fully insured removal company covering High Street, Kings Heath Park & Alcester Road South. 5-star rated.",
    type: "website",
    url: "https://www.birminghamremovals.uk/removals-kings-heath",
  },
};

const services = [
  {
    icon: Home,
    name: "House Removals Kings Heath",
    desc: "Full house moves across Kings Heath B14 — Victorian and Edwardian terraces, interwar semis off Vicarage Road and growing family homes near Kings Heath Park.",
  },
  {
    icon: Building2,
    name: "Flat Removals Kings Heath",
    desc: "Specialist flat removals in Kings Heath's converted Victorian properties and modern apartment blocks along the Alcester Road South corridor.",
  },
  {
    icon: Truck,
    name: "Man and Van Kings Heath",
    desc: "Affordable man and van in Kings Heath for single-room moves, sofa deliveries and light loads — quick turnaround on short-notice bookings throughout B14.",
  },
  {
    icon: Building2,
    name: "Office Removals Kings Heath",
    desc: "Weekend and evening office moves for Kings Heath High Street businesses, clinics and studios — no downtime, no disruption.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing across Kings Heath homes. We use double-walled boxes, furniture blankets and specialist wrapping to protect every item.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Secure short and long-term storage combined with your Kings Heath removal — ideal for the busy local property chain market in B14.",
  },
];

const whyUs = [
  {
    title: "Kings Heath Local Knowledge",
    desc: "We know the High Street loading restrictions, the parking permit zones around Institute Road and the fastest routes through B14 — knowledge that only comes from doing this daily.",
  },
  {
    title: "Fully Insured on Every Removal",
    desc: "£10m goods-in-transit and £5m public liability cover on every Kings Heath job — protecting your furniture from the moment we arrive to the moment it's placed in your new home.",
  },
  {
    title: "Fixed, Honest Pricing",
    desc: "No stair charges, no narrow-access surcharges, no weekend premiums. The price we quote is the price you pay — in writing, before move day.",
  },
  {
    title: "5-Star Rated in Birmingham",
    desc: "We've earned a 4.9-star Google average across hundreds of reviews. Kings Heath customers recommend us by name on local Facebook groups regularly.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Kings Heath cost?",
    a: "A typical 2–3 bedroom Kings Heath house move costs between £350–£800. Interwar semis with through-hallways and rear gardens are generally straightforward; Victorian terraces with back-entry access are priced once we've noted the layout. We return free quotes in under 30 minutes.",
  },
  {
    q: "Do you cover the Kings Heath postcode B14?",
    a: "Yes — we cover all of B14 including Kings Heath village, Billesley, Brandwood End, the Wheelers Lane corridor and the streets off Vicarage Road and Institute Road. No travel surcharge applies to B14 postcodes.",
  },
  {
    q: "Can you help with parking on Kings Heath High Street?",
    a: "Kings Heath High Street has controlled parking zones and active loading bays. We time our arrival for early morning to avoid peak hours and apply for Birmingham City Council bay suspensions on your behalf where a dedicated loading space is required.",
  },
  {
    q: "Do you offer same-day removals in Kings Heath?",
    a: "Yes — call us before 10 am and we'll do our best to arrange a same-day man and van in Kings Heath for loads up to 3 rooms. Full house moves in B14 need 48 hours' notice for the right van size and crew allocation.",
  },
  {
    q: "Can you move from a terraced house with rear-entry access in Kings Heath?",
    a: "Absolutely — Kings Heath has many Victorian terraces where furniture has to go through the back entry rather than the front door. Our crew carries sack trucks and furniture straps sized for these narrow passages. We always survey the access route before quoting.",
  },
];

export default async function RemovalsKingsHeathPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Kings Heath",
    url: "https://www.birminghamremovals.uk/removals-kings-heath",
    telephone: "+441216660000",
    areaServed: "Kings Heath, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B14",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.4267, longitude: -1.8925 },
    image: "https://www.birminghamremovals.uk/images/logo.png",
    priceRange: "££",
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
            Serving Kings Heath B14 — High Street to Kings Heath Park
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Kings Heath</span>, Birmingham
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals covers every corner of Kings Heath B14 — from the Victorian
            terraces off Institute Road to the interwar semis around Vicarage Road and Kings
            Heath Park. Our fully insured, locally based crew delivers professional, punctual
            removals for families, professionals and first-time buyers throughout B14.
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
              Our Removal Services in Kings Heath
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
              Moving to or from Kings Heath?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Kings Heath occupies the B14 postcode approximately 4 miles south of Birmingham
              city centre, straddling the Alcester Road South (A435) — the main artery running
              from the city to Redditch and the M42. The area is one of south Birmingham&apos;s
              most popular and densely populated residential districts, with a thriving High
              Street that has resisted the retail decline seen elsewhere in the city. Independent
              cafes, butchers, bookshops and a weekly market keep Kings Heath High Street busy
              throughout the week, making it one of Birmingham&apos;s most genuinely local
              neighbourhood centres. Kings Heath Park — one of the largest parks in south
              Birmingham — sits to the east of the High Street, providing green space for the
              thousands of families who have chosen B14 as their home.
            </p>
            <p>
              The housing stock in Kings Heath is diverse and reflects the area&apos;s long
              residential history. The streets immediately off the High Street and around
              Institute Road are predominantly Victorian red-brick terraces — tightly packed,
              with small rear yards, steep staircases and narrow front entries. Further out
              toward Vicarage Road and Wheelers Lane, the housing transitions to interwar
              semis — wider plots, through-lounges, garages and established gardens. The
              Billesley area to the south-east of B14 has post-war council and private
              estates. As your removal company in Kings Heath, we have experience with every
              property type and access configuration in B14, from tight terrace entries to
              wide semi-detached driveways.
            </p>
            <p>
              Kings Heath is a hub for first-time buyers and young families who have been
              priced out of Moseley and Harborne. We regularly handle moves along the
              Moseley–Kings Heath corridor — families stepping up from a Kings Heath terrace
              to a{" "}
              <Link href="/removals-moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>
              {" "}semi, or downsizers moving from a Kings Heath family home to a{" "}
              <Link href="/removals-hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>
              {" "}bungalow. We also move many clients between Kings Heath and{" "}
              <Link href="/removals-harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>
              ,{" "}
              <Link href="/removals-selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link>
              {" "}and{" "}
              <Link href="/removals-northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>
              {" "}— all close by and all within our standard coverage zone.
            </p>
            <p>
              Parking in Kings Heath requires advance planning. The High Street (B4121) has
              active loading bays and controlled zones throughout the day. Institute Road and
              some streets off Vicarage Road operate resident permit schemes. Our removal
              company Kings Heath operation always plans this in advance — we apply for{" "}
              <a
                href="https://www.birmingham.gov.uk/info/20076/parking/1101/parking_suspensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                Birmingham City Council parking suspensions
              </a>
              {" "}where needed and time arrivals to minimise disruption to your neighbours
              and the local traffic flow.
            </p>
            <p>
              Man and van Kings Heath bookings are available 7 days a week, including bank
              holidays. Whether you need a single item moved across B14 or a full 4-bedroom
              family relocation, we have the van size and crew to match. Get a free quote
              today and see why so many Kings Heath residents choose Birmingham Removals
              year after year.
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
              Why Choose Birmingham Removals in Kings Heath
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
              Removals Kings Heath — Frequently Asked Questions
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
            Get a Free Quote for Removals in Kings Heath
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your B14 postcode, move date and rough volume and receive a fixed,
            no-obligation quote within 30 minutes. No call centres — direct to your move team.
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
