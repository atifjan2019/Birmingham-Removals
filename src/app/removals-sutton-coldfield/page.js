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
  title: "Removals Sutton Coldfield",
  description:
    "Premium removals in Sutton Coldfield B72–B76. Fully insured, 5-star rated removal company covering Four Oaks, Mere Green, The Parade & Sutton Park. Free quote.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-sutton-coldfield" },
  openGraph: {
    title: "Removals Sutton Coldfield | Birmingham Removals",
    description:
      "Premium removals in Sutton Coldfield B72–B76. Fully insured, 5-star rated removal company covering Four Oaks, Mere Green, The Parade & Sutton Park.",
    type: "website",
    images: [{ url: "https://www.birminghamremovals.uk/og-image.jpg", width: 1200, height: 630 }],
    url: "https://www.birminghamremovals.uk/removals-sutton-coldfield",
  },
  twitter: { card: "summary_large_image" },
};

const services = [
  {
    icon: Home,
    name: "House Removals Sutton Coldfield",
    desc: "Discreet, premium house removals across Sutton Coldfield — from large detached homes in Four Oaks to executive new-builds in Walmley and Edwardian villas on Boldmere Road.",
  },
  {
    icon: Building2,
    name: "Luxury & High-Value Moves",
    desc: "Specialist handling for antiques, grand pianos, fine art and bespoke furniture — the standard expectation in Sutton Coldfield&apos;s premium property market.",
  },
  {
    icon: Truck,
    name: "Man and Van Sutton Coldfield",
    desc: "Flexible, vetted man and van service in Sutton Coldfield for single-room moves, storage transfers and smaller loads across B72, B73, B74, B75 and B76.",
  },
  {
    icon: Building2,
    name: "Office Removals Sutton Coldfield",
    desc: "Professional office removals for Sutton Coldfield town centre businesses and The Parade retail units — weekend and evening scheduling to avoid disruption.",
  },
  {
    icon: Package,
    name: "Full Packing Service",
    desc: "White-glove packing for Sutton Coldfield moves — bespoke crating for artwork, specialist piano moving, wardrobe packing service and full inventory documentation.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Premium secure storage alongside your Sutton Coldfield removal — climate-controlled options available for antiques, wine and sensitive items.",
  },
];

const whyUs = [
  {
    title: "Sutton Coldfield Property Specialists",
    desc: "We move homes across the Royal Town regularly — from the gated avenues of Four Oaks to Mere Green village. Our crews handle high-value properties with the discretion and precision they deserve.",
  },
  {
    title: "£10m Fully Insured on Every Job",
    desc: "Goods-in-transit and public liability cover at the level required for Sutton Coldfield&apos;s high-value property market. Every item is documented before loading.",
  },
  {
    title: "Transparent Premium Pricing",
    desc: "Our Sutton Coldfield quotes are detailed, written and fixed. No hidden costs, no day-rate ambiguity — a professional service priced fairly for the work involved.",
  },
  {
    title: "5-Star Rated in Sutton Coldfield",
    desc: "Our reputation in B72–B76 is built on word of mouth. Sutton Coldfield residents refer us to friends and family because we deliver the quality they expect — every time.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Sutton Coldfield cost?",
    a: "A 3–4 bedroom Sutton Coldfield house move typically costs £600–£1,400 depending on volume, access and destination. Larger Four Oaks detached homes with outbuildings and garages are quoted individually after an assessment. We return detailed, fixed quotes within 30 minutes of your enquiry.",
  },
  {
    q: "Do you cover all Sutton Coldfield postcodes — B72 to B76?",
    a: "Yes — we cover all Sutton Coldfield postcodes: B72 (Wylde Green, Boldmere), B73 (Sutton town centre, Walmley), B74 (Four Oaks, Streetly), B75 (Mere Green, Sutton Coldfield north) and B76 (Marston Green, Minworth). No travel surcharge applies to any of these postcodes.",
  },
  {
    q: "Can you move a grand piano or antique furniture in Sutton Coldfield?",
    a: "Yes — specialist handling of pianos, antiques, fine art and high-value furniture is a core part of our Sutton Coldfield service. We use bespoke piano boards, crating materials and furniture blankets. High-value items are logged with photographs before loading and we can arrange additional insurance cover on request.",
  },
  {
    q: "Do you offer same-day removals in Sutton Coldfield?",
    a: "For man and van jobs in Sutton Coldfield, same-day availability is possible — call before midday. Full house moves in B72–B76 typically need 48–72 hours' planning to allocate the right van, crew size and access arrangements, particularly for larger detached properties.",
  },
  {
    q: "Can you handle gated property access in Four Oaks, Sutton Coldfield?",
    a: "Yes — we work with gated properties throughout Sutton Coldfield regularly. Before move day we confirm access codes, intercom procedures and any size restrictions on entry vehicles. Our crews are briefed to be discreet, punctual and respectful of security arrangements throughout.",
  },
];

export default async function RemovalsSuttonColdfieldPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Sutton Coldfield",
    url: "https://www.birminghamremovals.uk/removals-sutton-coldfield",
    telephone: "+441216660000",
    areaServed: "Sutton Coldfield, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Sutton Coldfield",
      postalCode: "B72",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.5586, longitude: -1.8232 },
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
            Serving Sutton Coldfield B72–B76 — Four Oaks to Mere Green
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Sutton Coldfield</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals delivers premium, fully insured house and office removals across
            the Royal Town of Sutton Coldfield — B72, B73, B74, B75 and B76. From Four Oaks
            executive homes to Boldmere Road Edwardian villas and new-build estates in Walmley,
            our experienced crew provides the discreet, meticulous service that Sutton Coldfield
            properties demand.
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
              Our Removal Services in Sutton Coldfield
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
              Moving to or from Sutton Coldfield?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Sutton Coldfield — officially the Royal Town of Sutton Coldfield — occupies the
              B72 through B76 postcodes in north-east Birmingham, approximately 7 miles from
              the city centre. It is consistently ranked among the most affluent areas in the
              West Midlands and is one of the highest-demand property markets in the Birmingham
              commuter belt. The town centre on The Parade (B73) offers independent retailers,
              restaurants and professional services, while the surrounding residential areas
              vary from the ultra-premium Four Oaks estate (B74) — with multi-bedroom detached
              homes regularly exceeding £1 million — through to the pleasant interwar semis of
              Boldmere and Wylde Green (B72) and the newer private estates in Walmley and
              Minworth (B76).
            </p>
            <p>
              The centrepiece of Sutton Coldfield is{" "}
              <a
                href="https://www.birmingham.gov.uk/suttonpark"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                Sutton Park
              </a>
              {" "}— a National Nature Reserve covering over 2,400 acres, making it one of the
              largest urban parks in Europe. The park is a significant reason families choose
              Sutton Coldfield as their long-term home, and we regularly move families into B74
              and B75 specifically because of its proximity. As a removal company serving Sutton
              Coldfield, we&apos;ve moved hundreds of families into the area over the past decade
              and understand exactly what residents expect from a premium moving service.
            </p>
            <p>
              The property types in Sutton Coldfield require specialist knowledge and care. In
              Four Oaks (B74), large detached homes sit on generous plots behind electric gates,
              with long driveways, outbuildings and sometimes basement levels. Furniture pieces
              in these properties are frequently bespoke, oversized or antique — requiring
              specialist blanket-wrapping, custom crating or a piano board. In Mere Green (B75)
              and along Rectory Road, Edwardian and inter-war detached homes have wide hallways
              but can have tight turning staircases on the upper floors. Our crews arrive fully
              equipped and briefed on the specific property before the day starts.
            </p>
            <p>
              Sutton Coldfield is served by the Birmingham Road (A5127), Lichfield Road and
              Chester Road as its main arterial routes. Moves toward{" "}
              <Link href="/removals-erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>
              {" "}and Birmingham city centre via Chester Road (A452) are straightforward. Moves
              to{" "}
              <Link href="/removals-harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>
              {" "}or{" "}
              <Link href="/removals-solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>
              {" "}are cross-city moves we handle frequently — single quote, one crew, full
              service. Sutton Coldfield Town Council&apos;s{" "}
              <a
                href="https://www.royalsuttoncoldfieldtowncouncil.gov.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                official website
              </a>
              {" "}provides local area information for new residents.
            </p>
            <p>
              Whether you&apos;re upsizing to Four Oaks, relocating from Boldmere to Mere Green
              or moving into Sutton Coldfield from elsewhere in the West Midlands, Birmingham
              Removals provides the premium, fully insured service your move deserves. Our
              removal company Sutton Coldfield residents trust — because we treat every home
              with the level of care we&apos;d want for our own.
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
              Why Choose Birmingham Removals in Sutton Coldfield
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
              Removals Sutton Coldfield — Frequently Asked Questions
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
            Get a Free Quote for Removals in Sutton Coldfield
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your Sutton Coldfield postcode, move date and property details and receive
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
