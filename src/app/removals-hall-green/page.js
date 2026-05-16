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
  title: "Removals Hall Green | Birmingham Removals",
  description:
    "Experienced removals in Hall Green B28. Fully insured removal company serving Stratford Road, Springfield Park & Swanshurst. Affordable rates. Free quote.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-hall-green" },
  openGraph: {
    title: "Removals Hall Green | Birmingham Removals",
    description:
      "Experienced removals in Hall Green B28. Fully insured removal company serving Stratford Road, Springfield Park & Swanshurst. Affordable rates.",
    type: "website",
    url: "https://www.birminghamremovals.uk/removals-hall-green",
  },
};

const services = [
  {
    icon: Home,
    name: "House Removals Hall Green",
    desc: "Full house removals across Hall Green B28 — the 1930s interwar semis, Victorian terraces near the Acocks Green border and suburban bungalows all handled with careful planning.",
  },
  {
    icon: Building2,
    name: "Flat Removals Hall Green",
    desc: "Flat removals across Hall Green and the Stratford Road corridor — including purpose-built blocks and converted Victorian terraces throughout B28.",
  },
  {
    icon: Truck,
    name: "Man and Van Hall Green",
    desc: "Flexible man and van in Hall Green for smaller moves, student changeovers and furniture deliveries. Available across B28 and into Acocks Green, Sparkhill and Shirley.",
  },
  {
    icon: Building2,
    name: "Office Removals Hall Green",
    desc: "Small and medium office removals for Hall Green businesses along Stratford Road — reliable, efficient and timed to minimise disruption to your team.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Professional packing in Hall Green homes — double-walled boxes, furniture blankets and precision wrapping for fragile items, artwork and electronics.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Storage alongside your Hall Green removal — short-term between exchange and completion, or long-term for downsizers and those in temporary accommodation.",
  },
];

const whyUs = [
  {
    title: "Hall Green & B28 Expertise",
    desc: "We know the permit zones near Stratford Road (A34), the best access points for interwar semis with side passages and the quietest routes to avoid the school-run gridlock on Robin Hood Lane.",
  },
  {
    title: "Fully Insured on Every Move",
    desc: "£10m goods-in-transit cover on every Hall Green job. Your furniture, electronics and personal items are protected from loading to delivery.",
  },
  {
    title: "Fair, Fixed Pricing",
    desc: "Clear, written quotes for every Hall Green removal. No day-rate ambiguity and no charges that appear on move day that weren&apos;t in the quote.",
  },
  {
    title: "Consistent 4.9-Star Reviews",
    desc: "Hall Green customers regularly leave us 5-star reviews citing punctuality, care with furniture and polite, professional crews. We&apos;re proud of our reputation in B28.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Hall Green cost?",
    a: "A 2–3 bedroom Hall Green semi typically costs £300–£700 depending on volume and destination. 1930s semis with full through-lounges and garage contents are priced individually. Man and van in B28 starts from £120. Free, fixed quotes returned within 30 minutes.",
  },
  {
    q: "Do you cover the Hall Green postcode B28?",
    a: "Yes — all of B28, including Hall Green village, Shaftmoor Lane, Robin Hood Lane, Highfield Road, Springfield Road and the areas bordering Acocks Green (B27) and Shirley. No travel surcharge for any B28 address.",
  },
  {
    q: "Can you help with a period 1930s semi in Hall Green?",
    a: "Yes — 1930s interwar semis are the defining property type in Hall Green and we move them daily. They typically have bay-fronted lounges, a side passage, rear gardens and either a single garage or parking on the drive. Our crews are expert at managing large sofas through the front bay and navigating the through-lounge staircase arrangement.",
  },
  {
    q: "Do you do same-day removals in Hall Green?",
    a: "Yes, for man and van and smaller loads in B28. Call before midday and we&apos;ll confirm availability. Full house moves need 48 hours&apos; planning to assign the right crew size and vehicle.",
  },
  {
    q: "What roads do you use for removals in Hall Green?",
    a: "For most Hall Green moves we use the Stratford Road (A34) as the main corridor. For moves toward Kings Heath we use Highfield Road and the Alcester Road connection. For moves east toward Shirley and Solihull we use the Shaftmoor Lane and Baldwins Lane route to avoid the congested Stratford Road / Shirley Road junction. Local routing knowledge saves time on every move.",
  },
];

export default async function RemovalsHallGreenPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Hall Green",
    url: "https://www.birminghamremovals.uk/removals-hall-green",
    telephone: "+441216660000",
    areaServed: "Hall Green, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B28",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.4252, longitude: -1.8508 },
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
            Serving Hall Green B28 — Stratford Road to Swanshurst Park
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Hall Green</span>, Birmingham
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals provides trusted, fully insured house, flat and office removals
            across Hall Green B28. Whether you&apos;re in a 1930s interwar semi on Shaftmoor Lane,
            a Victorian terrace near Acocks Green or a bungalow by Springfield Park, our
            professional crew delivers a smooth, stress-free move every time.
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
              Our Removal Services in Hall Green
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
              Moving to or from Hall Green?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Hall Green covers the B28 postcode in south-east Birmingham, approximately
              5 miles from the city centre along the Stratford Road (A34). It is a
              predominantly residential suburb, developed primarily during the interwar
              period of the 1920s and 1930s, and is characterised by the classic Birmingham
              semi — bay-fronted, pebble-dashed or brick-faced three-bedroom houses that
              define the streetscape of Shaftmoor Lane, Robin Hood Lane, Springfield Road
              and the surrounding streets. Hall Green is an archetypal settled south Birmingham
              suburb: family-friendly, good schools in catchment, green space readily accessible
              and well-connected to the city centre and Solihull by the A34 and A41 corridors.
            </p>
            <p>
              As a removal company in Hall Green, we complete moves across B28 on an almost
              daily basis. The 1930s semis that make up the majority of the housing stock here
              have specific characteristics we know well — they are solidly built with plaster
              walls, they often have side passages too narrow for larger items, and the front
              bay window area is frequently the access point of choice for three-seater sofas
              that won&apos;t fit around the hallway staircase. Our crews are experienced at
              removing bay window frames where necessary (and re-fitting them securely), and
              at using specialist furniture moving boards for larger pieces on Hall Green&apos;s
              characteristically tiled or parquet-floored ground floors.
            </p>
            <p>
              Springfield Park and Swanshurst Park in B28 provide substantial green open space
              for Hall Green residents, and the Highfield Road ground — historically significant
              as one of the earliest venues where Australia toured in Birmingham — is a local
              landmark. The Stratford Road (A34) is the primary artery through the area and
              connects Hall Green south to Shirley and the Solihull boundary, north through
              Sparkhill to Birmingham city centre. As your removal company Hall Green residents
              trust, we navigate the A34 efficiently and take quieter parallel routes like
              Highfield Road and Baldwins Lane to avoid traffic.
            </p>
            <p>
              Hall Green borders several areas where we are also very active — including{" "}
              <Link href="/removals-moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>
              {" "}(B13) to the north-west,{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>
              {" "}(B14) to the west and{" "}
              <Link href="/removals-solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>
              {" "}(B91) to the south-east. Cross-boundary moves between Hall Green and any of
              these areas are quoted as a single job with one crew and one truck — no split
              billing. Birmingham City Council&apos;s{" "}
              <a
                href="https://www.birmingham.gov.uk/info/20076/parking/1101/parking_suspensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                parking suspension service
              </a>
              {" "}is applicable to Hall Green and we manage the application on your behalf
              where access on a controlled street is needed.
            </p>
            <p>
              Whether you&apos;re buying your first semi in B28, moving between two Hall Green
              streets or relocating from Hall Green to{" "}
              <Link href="/removals-erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>
              {" "}or beyond, Birmingham Removals provides the professional, insured and
              affordable removal service you deserve. Request a free quote today.
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
              Why Choose Birmingham Removals in Hall Green
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
              Removals Hall Green — Frequently Asked Questions
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
            Get a Free Quote for Removals in Hall Green
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your B28 postcode, move date and property size and receive a fixed,
            no-obligation quote within 30 minutes. Same-day availability for smaller moves.
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
