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
  title: "Removals Selly Oak",
  description:
    "Affordable removals in Selly Oak B29. Fully insured removal company specialising in student moves, Victorian terraces & HMOs near Bristol Road. Free same-day quotes.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-selly-oak" },
  openGraph: {
    title: "Removals Selly Oak | Birmingham Removals",
    description:
      "Affordable removals in Selly Oak B29. Fully insured removal company specialising in student moves, Victorian terraces & HMOs near Bristol Road.",
    type: "website",
    images: [{ url: "https://www.birminghamremovals.uk/og-image.jpg", width: 1200, height: 630 }],
    url: "https://www.birminghamremovals.uk/removals-selly-oak",
  },
  twitter: { card: "summary_large_image" },
};

const services = [
  {
    icon: Home,
    name: "House Removals Selly Oak",
    desc: "End-to-end house removals across Selly Oak B29 — from multi-bedroom student terraces off Oak Tree Lane to family homes on the quieter streets near Selly Oak Park.",
  },
  {
    icon: Building2,
    name: "Student Moves Selly Oak",
    desc: "Fast, affordable end-of-term and September-rush student moves throughout Selly Oak and Bournbrook. Last-minute bookings welcome — we know the student calendar.",
  },
  {
    icon: Truck,
    name: "Man and Van Selly Oak",
    desc: "Single-room, single-floor and light-load moves across Selly Oak. Our man and van service is ideal for the frequent short-hop relocations within B29 and into B15, B17 or B30.",
  },
  {
    icon: Building2,
    name: "HMO & Shared House Moves",
    desc: "Specialist moves for shared houses and HMOs throughout Selly Oak — individual rooms quoted separately, co-ordinated on moving day so each tenant's belongings stay separate.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing in Selly Oak homes using double-walled boxes and protective wrapping. Particularly useful for students with fragile equipment, monitors and musical instruments.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Short-term secure storage combined with your Selly Oak removal — ideal for bridging the gap between tenancy end dates and new property start dates.",
  },
];

const whyUs = [
  {
    title: "Selly Oak Student Move Specialists",
    desc: "We handle dozens of student moves every July and September across Selly Oak and Bournbrook. We know the drill — parking on Bristol Road, tight terraced entries and last-minute bookings.",
  },
  {
    title: "Fully Insured on Every Job",
    desc: "£10m goods-in-transit and £5m public liability on every removal in Selly Oak — whether it's a single room or a 6-bed shared house clearance.",
  },
  {
    title: "Honest, Upfront Pricing",
    desc: "No hidden fees for awkward terraced access, bike storage or narrow staircases. Your written quote is your final price — always.",
  },
  {
    title: "5-Star Rated Removal Company",
    desc: "Hundreds of verified Google reviews from across Birmingham, including many Selly Oak students and families who book us year after year.",
  },
];

const faqs = [
  {
    q: "How much does a student removal in Selly Oak cost?",
    a: "A single-room student move within Selly Oak or from B29 to another Birmingham postcode typically costs £100–£250 depending on volume and distance. A full 5–6 bedroom shared house clear-out with multiple drop-off addresses runs £400–£700. Contact us for a tailored quote — we price by load, not per hour.",
  },
  {
    q: "Do you cover the Selly Oak postcode B29?",
    a: "Yes. We operate daily across all of B29 — Selly Oak village, Bournbrook, the streets off Bristol Road (A38), Oak Tree Lane and the Harborne Lane corridors. There is no travel surcharge for B29 postcodes.",
  },
  {
    q: "Can you handle parking restrictions on Bristol Road in Selly Oak?",
    a: "Bristol Road (A38) has bus lanes, double yellows and peak-hour restrictions that catch out inexperienced crews. We plan loading times to avoid peak hours and, where needed, apply for Birmingham City Council bay suspensions in advance. See the council's parking permit page at birmingham.gov.uk for reference.",
  },
  {
    q: "Do you offer same-day or last-minute removals in Selly Oak?",
    a: "Yes — last-minute bookings are a Selly Oak speciality for us. Call before midday and we'll do our best to get a van to you the same day, particularly for 1–3 room loads. Larger moves need 48 hours' notice so we can allocate the right crew and van size.",
  },
  {
    q: "Can you move from a Victorian terrace with no parking outside?",
    a: "Absolutely — narrow-frontage Victorian terraces with no direct parking are the norm in Selly Oak. We carry sack trucks, furniture straps and stair-slides on every job and are experienced at quick loading from double-yellow areas, keeping disruption to neighbours minimal.",
  },
];

export default async function RemovalsSellyOakPage() {
  const settings = await getSiteSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Selly Oak",
    url: "https://www.birminghamremovals.uk/removals-selly-oak",
    telephone: "+441216660000",
    areaServed: "Selly Oak, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B29",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 52.4385, longitude: -1.9414 },
    image: "https://www.birminghamremovals.uk/images/logo.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
    },
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
            Serving Selly Oak B29, Bournbrook &amp; surrounding streets
          </span>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in <span className="text-[#F97316]">Selly Oak</span>, Birmingham
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals is Selly Oak&apos;s go-to removal company for student moves,
            Victorian terrace clearances and full family relocations across B29. We operate on
            Bristol Road, Oak Tree Lane and throughout Bournbrook every week — no crew learns the
            area faster because we never left it. Fully insured, transparent pricing, same-day slots available.
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
              Our Removal Services in Selly Oak
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
              Moving to or from Selly Oak?
            </h2>
          </div>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Selly Oak occupies the B29 postcode roughly 3 miles south-west of Birmingham city
              centre, straddling the Bristol Road (A38) — one of the busiest arterial routes in
              the West Midlands. The area is best known for its large student population, driven
              by its proximity to the University of Birmingham&apos;s main Edgbaston campus just
              over the boundary and the Bournbrook student quarter immediately to the north. But
              Selly Oak is far more than a student town: the streets further from the university
              — particularly around Selly Oak Park, Oak Tree Lane and the quieter residential
              avenues off Harborne Lane — are home to long-established families, young
              professionals and downsizers who value the area&apos;s excellent transport links
              and local amenities.
            </p>
            <p>
              As a removal company covering Selly Oak every week, we understand the particular
              challenges this postcode throws up. The dominant housing type is the Victorian
              and Edwardian terrace: rows of two-up-two-down and bay-fronted houses with
              narrow front paths, steep internal staircases and minimal kerbside parking. Many
              of these properties have been converted into HMOs (houses in multiple occupation)
              for students, creating a busy, constant movement of residents — particularly in
              June, July and September when tenancies end and begin. Our man and van Selly Oak
              service is purpose-built for this market: quick, affordable and familiar with the
              logistics of multi-room moves where each tenant needs their belongings packed and
              transported separately.
            </p>
            <p>
              Bristol Road (A38) runs straight through the heart of Selly Oak and is both a
              blessing and a challenge for removal crews. It provides fast access from the south
              of Birmingham, but its bus lanes, peak-hour restrictions and limited loading areas
              mean any crew unfamiliar with the road risks delays and fines. We plan all Selly
              Oak removals around the A38&apos;s traffic patterns — arriving early, using the
              side streets off Oak Tree Lane and Gibbins Road to stage the van, and keeping
              loading time tight. For parking suspensions on restricted roads, Birmingham City
              Council&apos;s{" "}
              <a
                href="https://www.birmingham.gov.uk/info/20076/parking/1101/parking_suspensions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]"
              >
                parking suspension service
              </a>{" "}
              allows advance applications — something we handle on your behalf for larger moves.
            </p>
            <p>
              Selly Oak is well-connected to all the neighbouring areas we cover. Families
              frequently move between Selly Oak and{" "}
              <Link href="/removals-harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>
              {" "}(B17) to the west,{" "}
              <Link href="/removals-edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link>
              {" "}(B15) to the north-east and{" "}
              <Link href="/removals-northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>
              {" "}(B31) to the south along the Bristol Road corridor. Students finishing at
              the University of Birmingham often relocate to{" "}
              <Link href="/removals-moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>
              {" "}or{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>
              {" "}when they enter professional life — moves we complete regularly as a single-crew,
              single-quote job. Whether you need a man and van in Selly Oak for a room move or
              a full removal company service for a 4-bedroom family home, our rates are fixed,
              our crew is trained and our vans are stocked with all the blankets, straps and
              boxes the job requires.
            </p>
            <p>
              The Selly Oak Retail Park on Raddlebarn Road and the Battery Retail Park on
              Bristol Road attract significant traffic, which our crews factor into route
              planning on move day. For moves into the Bournville area — George Cadbury&apos;s
              model village just over the B29/B30 boundary — we&apos;re equally familiar with
              the estate roads and parking arrangements. As your trusted removal company in
              Selly Oak, we bring local knowledge that a national operator simply cannot match.
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
              Why Choose Birmingham Removals in Selly Oak
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
              Removals Selly Oak — Frequently Asked Questions
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
            Get a Free Quote for Removals in Selly Oak
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your B29 postcode, move date and rough volume and we&apos;ll return a fixed,
            no-obligation quote within 30 minutes — often faster during busy student season.
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
