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
  title: "Removals Moseley",
  description:
    "Expert removals in Moseley B13. Fully insured, 5-star removal company serving Moseley Village, Wake Green Road & the Alcester Road corridor. Free quote in 30 minutes.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-moseley" },
  openGraph: {
    title: "Removals Moseley | Birmingham Removals",
    description:
      "Expert removals in Moseley B13. Fully insured, 5-star removal company serving Moseley Village, Wake Green Road & the Alcester Road corridor.",
    type: "website",
    images: [{ url: "https://www.birminghamremovals.uk/og-image.jpg", width: 1200, height: 630 }],
    url: "https://www.birminghamremovals.uk/removals-moseley",
  },
  twitter: { card: "summary_large_image" },
};

const services = [
  {
    icon: Home,
    name: "House Removals Moseley",
    desc: "Full house removals across Moseley B13 — from bohemian Victorian terraces off Oxford Road to large Edwardian semis on Wake Green Road. Expert handling of period features throughout.",
  },
  {
    icon: Building2,
    name: "Flat Removals Moseley",
    desc: "Specialist flat removals from Moseley's converted Victorian villas and purpose-built blocks. We liaise on parking, lift and entry access well before move day.",
  },
  {
    icon: Truck,
    name: "Man and Van Moseley",
    desc: "Flexible man and van in Moseley for single-room moves, studio relocations and light loads — popular for the frequent tenant changeovers throughout B13.",
  },
  {
    icon: Building2,
    name: "Office Removals Moseley",
    desc: "Discreet out-of-hours office and studio removals for Moseley's creative businesses, therapists and independent traders on St Mary's Row and beyond.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing using specialist materials — particularly valuable in Moseley where period homes are filled with art, vinyl, vintage furniture and fragile collectibles.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Flexible secure storage alongside your Moseley removal — useful during the area's active buy-to-let and rental market where gaps between tenancies are common.",
  },
];

const whyUs = [
  {
    title: "Deep Local Knowledge of Moseley",
    desc: "We know the on-street permit zones around Moseley Village, the tight access on Salisbury Road and the best loading spots on the Alcester Road corridor — and we plan every move around them.",
  },
  {
    title: "Fully Insured, Every Job",
    desc: "£10m goods-in-transit cover on every Moseley removal — protecting the vintage furniture, art and musical instruments that are the norm in B13 homes.",
  },
  {
    title: "Transparent, Fixed Quotes",
    desc: "No surprise charges for converted-flat access, shared driveways or narrow Victorian doorways. Your quote is your final price.",
  },
  {
    title: "5-Star Rated, Locally Trusted",
    desc: "Hundreds of five-star Google reviews, many from Moseley residents who found us through a neighbour's recommendation. Word-of-mouth in B13 is our biggest source of bookings.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Moseley cost?",
    a: "A 2–3 bedroom house move in Moseley typically costs £350–£850, depending on property access, volume and destination. Victorian terraces with long paths and original staircases are priced once we know the layout. Contact us for a free, detailed quote returned within 30 minutes.",
  },
  {
    q: "Do you cover the Moseley postcode B13?",
    a: "Yes — we cover all of B13 including Moseley Village, the Wake Green Road corridor, Oxford Road, Salisbury Road, Billesley Lane and all streets between the Alcester Road (A435) and the Moseley Road (B4217). No travel surcharge applies to B13.",
  },
  {
    q: "Can you handle parking on Moseley's permit streets?",
    a: "Yes. Many streets in Moseley Village operate residents' permit zones, particularly around St Mary's Row and the village centre. We apply for Birmingham City Council parking suspensions where needed and plan loading to avoid school-run and market-day congestion.",
  },
  {
    q: "Do you offer same-day removals in Moseley?",
    a: "Yes, subject to availability. Call us before 10 am for the best chance of a same-day man and van slot in Moseley. Full house moves require at least 48 hours to plan properly.",
  },
  {
    q: "Can you move a vinyl collection and vintage furniture from a Moseley terrace?",
    a: "Absolutely — and we do it often. Moseley homes are packed with records, antique furniture and art. We use specialist vinyl crates, picture-frame boxes and furniture blankets on every job. Fragile and high-value items are documented and wrapped individually before loading.",
  },
];

export default async function RemovalsMoseleyPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Moseley",
    url: "https://www.birminghamremovals.uk/removals-moseley",
    telephone: "+441216660000",
    areaServed: "Moseley, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B13",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.4453, longitude: -1.8850 },
    image: "https://www.birminghamremovals.uk/images/logo.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
    },
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
            Serving Moseley B13 — village to Wake Green Road
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Moseley</span>, Birmingham
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals serves Moseley B13 with a fully insured, locally experienced
            crew who understand the village&apos;s period properties, tight residential streets
            and vibrant mix of professionals, creatives and families. From a Victorian terrace
            off Oxford Road to a large Edwardian home on Wake Green Road — we handle every move
            with the care and precision Moseley residents expect.
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
              Our Removal Services in Moseley
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">Local Knowledge</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Moving to or from Moseley?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Moseley sits in the B13 postcode approximately 3 miles south of Birmingham city
              centre, sandwiched between Balsall Heath to the north, Kings Heath to the south and
              the Edgbaston/Cannon Hill Park boundary to the west. Its village centre — centred
              on St Mary&apos;s Row and the Fighting Cocks junction on the Alcester Road (A435) —
              is one of Birmingham&apos;s most recognisable independent high streets, with an
              eclectic mix of coffee shops, record stores and restaurants that attract residents
              from across south Birmingham. Moseley Park, a private members&apos; park complete
              with a boating lake, sits discreetly behind the Victorian terraces, while Moseley
              Bog — the ancient woodland where J.R.R. Tolkien played as a child — lies to the
              south-east near Wake Green Road.
            </p>
            <p>
              As a removal company operating in Moseley B13 daily, we know every residential
              street in the area. The housing stock is overwhelmingly Victorian and Edwardian:
              red-brick terraces on Oxford Road and Salisbury Road, wide bay-fronted semis off
              Wake Green Road and Billesley Lane, and converted Victorian villas split into flats
              throughout the village. These properties present specific moving challenges — shared
              driveways with narrow vehicle access, shared hallways in flat conversions, and
              staircases that turn sharply on the first-floor landing. Our man and van Moseley
              service is designed for exactly these situations: a trained, experienced operative
              who moves quickly and carefully, treating your possessions and your landlord&apos;s
              property with equal respect.
            </p>
            <p>
              Many of our Moseley customers are professionals and creatives who have accumulated
              substantial collections of books, vinyl records, vintage furniture and artworks.
              We carry specialist packing materials — picture-frame boxes, vinyl record crates,
              furniture blankets and mirror packs — on every job. High-value and fragile items
              are photographed and logged before loading. Our removal company Moseley clients
              regularly tell us they chose us after being let down by cheaper operators who
              didn&apos;t understand the care these properties require.
            </p>
            <p>
              Moseley borders several areas we cover extensively. Families and professionals
              regularly move between Moseley and{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>
              {" "}(B14) to the south,{" "}
              <Link href="/removals-edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link>
              {" "}(B15) to the west and{" "}
              <Link href="/removals-hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>
              {" "}(B28) to the south-east. Students moving out of the Selly Oak area often
              settle in Moseley — we handle that route via our{" "}
              <Link href="/removals-selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak removal service</Link>
              {" "}regularly. The Alcester Road links Moseley directly to the city centre (A435)
              and to Redditch in the south — a route our vans travel daily. Birmingham City
              Council manages parking enforcement across the B13 permit zones; their{" "}
              <a
                href="https://www.birmingham.gov.uk/info/20076/parking/1101/parking_suspensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                parking suspension application process
              </a>{" "}
              is something we manage on your behalf for larger removals where kerbside access is essential.
            </p>
            <p>
              Whether you&apos;re a first-time buyer moving into a Moseley terrace, a growing
              family upsizing to a Wake Green Road semi, or a professional downsizing to a
              village-centre flat, our team provides the local knowledge and professional care
              that makes removals in Moseley stress-free. Contact us today for a free,
              itemised quote.
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
              Why Choose Birmingham Removals in Moseley
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">FAQs</span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Removals Moseley — Frequently Asked Questions
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
            Get a Free Quote for Removals in Moseley
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Tell us your Moseley postcode, move date and volume and we&apos;ll return a fixed,
            no-obligation quote in under 30 minutes. You speak directly with the crew managing your move.
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
