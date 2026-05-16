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
  title: "Removals Erdington | Birmingham Removals",
  description:
    "Fast, affordable removals in Erdington B23 & B24. Fully insured removal company covering Six Ways, Chester Road & Castle Vale. Same-day slots available. Free quote.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-erdington" },
  openGraph: {
    title: "Removals Erdington | Birmingham Removals",
    description:
      "Fast, affordable removals in Erdington B23 & B24. Fully insured removal company covering Six Ways, Chester Road & Castle Vale. Same-day slots available.",
    type: "website",
    url: "https://www.birminghamremovals.uk/removals-erdington",
  },
};

const services = [
  {
    icon: Home,
    name: "House Removals Erdington",
    desc: "Complete house removals across Erdington B23 and B24 — interwar semis, Victorian workers&apos; terraces and modern estate homes all handled with the same professional care.",
  },
  {
    icon: Building2,
    name: "Flat Removals Erdington",
    desc: "Flat and apartment removals across Erdington and Stockland Green — from ground-floor ex-council conversions to modern blocks on the Chester Road (A452) corridor.",
  },
  {
    icon: Truck,
    name: "Man and Van Erdington",
    desc: "Fast, affordable man and van in Erdington for single-room moves, furniture deliveries and short-notice relocations throughout B23, B24 and into neighbouring postcodes.",
  },
  {
    icon: Building2,
    name: "Office Removals Erdington",
    desc: "Cost-effective office and commercial removals for Erdington High Street businesses and light industrial units near Tyburn Road — flexible timing to suit your operation.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing across Erdington homes. We supply double-walled boxes, bubble wrap and furniture blankets — everything needed for a damage-free move.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Short and long-term storage alongside your Erdington removal — useful for downsizers, chain-break situations or relocations with a gap between move-out and move-in.",
  },
];

const whyUs = [
  {
    title: "Erdington Area Knowledge",
    desc: "We know the Six Ways junction, the Slade Road permit zones and the quickest routes across B23 and B24 to avoid the Gravelly Hill Interchange (Spaghetti Junction) bottlenecks.",
  },
  {
    title: "Fully Insured, Every Job",
    desc: "£10m goods-in-transit and £5m public liability cover on every Erdington removal — flat, house or office, regardless of size.",
  },
  {
    title: "Transparent, Fixed Pricing",
    desc: "Erdington is one of our most competitive-priced areas — affordable man and van rates and full removal quotes with no hidden charges.",
  },
  {
    title: "Same-Day Availability",
    desc: "Erdington sits close to our base, making same-day removals realistic. Call before noon and we'll do our best to have a van with you today.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Erdington cost?",
    a: "A 2–3 bedroom Erdington house move typically costs £300–£700. Smaller 1-bedroom flats and man and van jobs in B23/B24 start from £120. We price by load and distance, not by the hour, so you know exactly what you'll pay before move day. Free quotes within 30 minutes.",
  },
  {
    q: "Do you cover the Erdington postcodes B23 and B24?",
    a: "Yes — all of B23 (Erdington, Gravelly Hill, Stockland Green, Kingsbury Road corridor) and B24 (Gravelly Hill North, Tyburn Road area, Short Heath). Both postcodes are within our standard Birmingham coverage with no travel surcharge.",
  },
  {
    q: "Can you help with access near the Gravelly Hill Interchange?",
    a: "Yes. The M6/A38M Gravelly Hill Interchange (Spaghetti Junction) sits on the southern border of Erdington and causes significant traffic on Tyburn Road, Aston Lane and Gravelly Hill North. We route our vans around it and plan arrival times to avoid peak-hour gridlock — especially on Monday mornings and Friday afternoons.",
  },
  {
    q: "Do you offer same-day removals in Erdington?",
    a: "Yes — Erdington is one of the areas where same-day removals are regularly possible. Call before midday and we'll confirm availability. We're particularly quick to respond for 1–3 room loads in B23 and B24.",
  },
  {
    q: "Can you move from a Castle Vale property in Erdington?",
    a: "Absolutely. Castle Vale — formerly a post-war housing estate, now largely private — has a mix of houses, maisonettes and bungalows. We're very familiar with the estate layout, access roads and parking arrangements and have completed many Castle Vale removals to locations across Birmingham and beyond.",
  },
];

export default async function RemovalsErdingtonPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Erdington",
    url: "https://www.birminghamremovals.uk/removals-erdington",
    telephone: "+441216660000",
    areaServed: "Erdington, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B23",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.5190, longitude: -1.8420 },
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
            Serving Erdington B23 &amp; B24 — Six Ways to Castle Vale
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Erdington</span>, Birmingham
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals provides fast, fully insured house, flat and office removals
            across Erdington B23 and B24. From the Victorian streets near Erdington village to
            the Castle Vale estate and the Gravelly Hill corridor, our experienced crew delivers
            a professional, affordable service — same-day slots often available.
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
              Our Removal Services in Erdington
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
              Moving to or from Erdington?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Erdington covers the B23 and B24 postcodes in north Birmingham, sitting
              approximately 5 miles north of the city centre. It&apos;s one of Birmingham&apos;s
              largest and most diverse residential districts, stretching from the Victorian
              streets around Erdington village and the Six Ways roundabout in the south, through
              the interwar housing of Stockland Green, to the Gravelly Hill North and Tyburn Road
              corridors that border Castle Vale to the east. The Chester Road (A452) cuts through
              the centre of B23 north to south, connecting Erdington directly to Sutton Coldfield
              to the north and the M6 Gravelly Hill Interchange (Spaghetti Junction) to the south.
            </p>
            <p>
              As a removal company operating in Erdington daily, we understand the diversity of
              property types across B23 and B24. Close to Erdington village and the High Street,
              you find Victorian and Edwardian terraces — workers&apos; housing built during
              Birmingham&apos;s industrial expansion, with modest frontages, rear entries and
              tight internal staircases. Moving toward Stockland Green and the Chester Road, the
              housing transitions to 1930s and 1950s semis — wider plots with garages, rear
              gardens and decent driveways. Castle Vale, on the B24 eastern edge, was originally
              a large post-war local authority estate built on a former airfield and is now
              predominantly private ownership — a mix of bungalows, terraces and semi-detached
              properties, many of which have been significantly extended and improved.
            </p>
            <p>
              One of the key challenges for removals in Erdington is traffic management around
              the Gravelly Hill Interchange — the M6/A38M junction known widely as &quot;Spaghetti
              Junction&quot;. Its proximity to B23 means that Tyburn Road, Gravelly Hill North
              and Aston Lane can become very congested during morning and evening peaks. Our
              crews plan all Erdington removals around these pinch points — early starts on
              Chester Road are often the best option for moves heading south into the city or
              east toward{" "}
              <Link href="/removals-sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link>
              . Birmingham City Council&apos;s{" "}
              <a
                href="https://www.birmingham.gov.uk/info/20076/parking/1101/parking_suspensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                parking suspension service
              </a>{" "}
              is available for Erdington moves where on-street access is required.
            </p>
            <p>
              Erdington is a very popular area for first-time buyers and young families, drawn
              by affordable house prices and good access to Sutton Park (just beyond the B72
              border in Sutton Coldfield), the city centre by bus and the M6 for those commuting
              regionally. We frequently move clients between Erdington and{" "}
              <Link href="/removals-sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link>
              {" "}(the next step up the property ladder for many Erdington families),{" "}
              <Link href="/removals-hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>
              {" "}and across the city. As your removal company Erdington residents have trusted
              for over a decade, our prices are fair, our vans are modern and our crews are trained
              to handle every property type in B23 and B24 with care.
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
              Why Choose Birmingham Removals in Erdington
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
              Removals Erdington — Frequently Asked Questions
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
            Get a Free Quote for Removals in Erdington
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your B23 or B24 postcode, move date and volume and we&apos;ll return a fixed,
            no-obligation quote in under 30 minutes. Same-day slots often available.
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
