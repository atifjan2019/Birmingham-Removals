import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import TrustBar from "@/components/TrustBar";
import { getSiteSettings } from "@/lib/siteSettings";
import {
  MapPin,
  Home,
  Building2,
  Truck,
  Package,
  Warehouse,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock,
  BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Removals Edgbaston | Birmingham Removals",
  description:
    "Expert removals in Edgbaston (B15/B16). Fully insured, 5-star rated removal company serving the Calthorpe Estate, Hagley Road & surrounding streets. Free quote today.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-edgbaston" },
  openGraph: {
    title: "Removals Edgbaston | Birmingham Removals",
    description:
      "Expert removals in Edgbaston (B15/B16). Fully insured, 5-star rated removal company serving the Calthorpe Estate, Hagley Road & surrounding streets.",
    type: "website",
    url: "https://www.birminghamremovals.uk/removals-edgbaston",
  },
};

const services = [
  {
    icon: Home,
    name: "House Removals Edgbaston",
    desc: "Full house moves across Edgbaston — from compact Victorian terraces to the grand detached properties of the Calthorpe Estate. We plan every detail in advance.",
  },
  {
    icon: Building2,
    name: "Flat Removals Edgbaston",
    desc: "Specialist flat removals across the Hagley Road mansion conversions and modern apartment blocks in Edgbaston. Lift access, parking and floor plans arranged beforehand.",
  },
  {
    icon: Truck,
    name: "Man and Van Edgbaston",
    desc: "Flexible man and van service in Edgbaston for smaller loads, single-room moves or student relocations near the University of Birmingham.",
  },
  {
    icon: Building2,
    name: "Office Removals Edgbaston",
    desc: "Out-of-hours and weekend office removals across Edgbaston business parks and consulting suites — zero downtime for your practice or firm.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing in Edgbaston homes using double-walled boxes and specialist wrapping. We protect antiques, artwork and fragile items as standard.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Short and long-term secure storage combined with your Edgbaston removal — ideal during chain delays or property completions.",
  },
];

const whyUs = [
  {
    title: "Deep Local Knowledge of Edgbaston",
    desc:
      "We know every restricted bay on Harborne Road, every narrow gate on the Calthorpe Estate and the fastest routes through Five Ways at any time of day.",
  },
  {
    title: "Fully Insured on Every Job",
    desc:
      "£10m goods-in-transit and £5m public liability cover comes as standard — critical for the high-value furniture and antiques common in Edgbaston homes.",
  },
  {
    title: "Transparent, Fixed Pricing",
    desc:
      "No hidden charges for stairs, parking permit costs or weekend slots. Your written quote is the price you pay.",
  },
  {
    title: "5-Star Rated Removal Company",
    desc:
      "Hundreds of verified Google reviews from Edgbaston and across Birmingham. We maintain a 4.9-star average because our crews care about the details.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Edgbaston cost?",
    a: "Most Edgbaston house moves (2–3 bedrooms) run between £400–£900 depending on volume, access and distance. Hagley Road mansion flat moves with lift access can be quoted more precisely once we know your floor and van size. Contact us for a free, itemised quote.",
  },
  {
    q: "Do you cover the Edgbaston postcode — B15 and B16?",
    a: "Yes. We operate daily across B15 (central Edgbaston, Calthorpe Estate, Five Ways) and B16 (Edgbaston western fringe toward Ladywood and Bearwood Road). Both postcodes are within our standard Birmingham coverage — no travel surcharge.",
  },
  {
    q: "Can you help with parking restrictions in Edgbaston?",
    a: "Absolutely. Hagley Road and Harborne Road both operate permit zones and can be busy with residents and medical centre traffic. We liaise with Birmingham City Council to obtain suspension permits where required and time our arrival to avoid peak hours.",
  },
  {
    q: "Do you offer same-day removals in Edgbaston?",
    a: "Yes, subject to van availability. We regularly handle same-day man and van jobs across Edgbaston, particularly for studio and 1-bedroom moves. Call us before 10 am for the best chance of a same-day slot.",
  },
  {
    q: "Can you move large furniture from a Victorian villa in Edgbaston?",
    a: "Definitely. Edgbaston's Victorian and Edwardian villas often have wide hallways and tall ceilings that are easier to navigate than modern properties — but their staircase turns can be tight. Our crew carries furniture straps, stair-slides and blanket-wrap as standard to protect both your belongings and the original woodwork.",
  },
];

export default async function RemovalsEdgbastonPage() {
  const settings = await getSiteSettings();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Edgbaston",
    url: "https://www.birminghamremovals.uk/removals-edgbaston",
    telephone: "+441216660000",
    areaServed: "Edgbaston, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B15",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.4697,
      longitude: -1.9321,
    },
    image: "https://www.birminghamremovals.uk/images/logo.png",
    priceRange: "££",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar settings={settings} />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white">
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-[#F97316]/10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium backdrop-blur mb-5">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            Serving Edgbaston B15 &amp; B16 and surrounding streets
          </span>

          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in{" "}
            <span className="text-[#F97316]">Edgbaston</span>
            , Birmingham
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals provides professional, fully insured house and office removals
            across Edgbaston B15 and B16. Whether you&apos;re leaving a Calthorpe Estate villa,
            a Hagley Road apartment or a Victorian terrace off Bristol Road, our experienced crew
            handles every lift, wrap and load with care. Trusted by Edgbaston residents since 2015.
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

      {/* ── Services ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">
              What We Do
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Our Removal Services in Edgbaston
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Every service is delivered by our Birmingham-based crew — no agency staff, no subcontracting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, name, desc }) => (
              <div
                key={name}
                className="p-7 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-[#F97316]/30 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4 group-hover:bg-[#F97316]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#F97316]" />
                </div>
                <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-lg mb-2">
                  {name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local Area ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">
              Local Knowledge
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Moving to or from Edgbaston?
            </h2>
          </div>

          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Edgbaston sits just 1.5 miles south-west of Birmingham city centre, bordered by Five
              Ways to the north-east and Harborne to the west. The postcode districts B15 and B16
              cover some of the most sought-after residential streets in Birmingham — from the leafy
              avenues of the Calthorpe Estate to the grand Hagley Road corridor, which runs through
              the heart of the area. As a removal company in Edgbaston we navigate these routes every
              week, so we know exactly where parking bays are suspended for medical appointments and
              which access roads serve the larger properties.
            </p>
            <p>
              The housing stock here is varied and often large. The Calthorpe Estate contains
              Victorian and Edwardian detached villas with sweeping driveways, wide hallways and
              original staircases that reward an experienced crew. Further toward the B16 boundary
              near Ladywood you&apos;ll find Edwardian semis, 1930s built-for-purpose blocks and
              converted mansion flats — each with its own access challenge. Our man and van Edgbaston
              service is popular for flat-to-flat and room moves in these conversions, while our full
              removal crews handle 4- and 5-bedroom estate properties with ease.
            </p>
            <p>
              We also regularly move families between Edgbaston and the neighbouring areas we cover,
              including{" "}
              <Link href="/removals-harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Harborne
              </Link>
              ,{" "}
              <Link href="/removals-selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Selly Oak
              </Link>
              ,{" "}
              <Link href="/removals-moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Moseley
              </Link>{" "}
              and{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Kings Heath
              </Link>
              . Whether you&apos;re upsizing from a Moseley terrace to an Edgbaston semi or downsizing
              from the Calthorpe Estate to a Harborne village apartment, we make the move seamless.
              As a trusted removal company Edgbaston residents have relied on for a decade, we&apos;re
              proud of the repeat bookings and referrals we receive from the B15 and B16 postcodes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">
              Why Us
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Why Choose Birmingham Removals in Edgbaston
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {whyUs.map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
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

          {/* Trust stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
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
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">
              FAQs
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Removals Edgbaston — Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] hover:bg-slate-50 transition-colors">
                  <span>{q}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
            Free Quote
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-4">
            Get a Free Quote for Removals in Edgbaston
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Tell us your move date, postcode and rough volume and we&apos;ll return a fixed, no-obligation
            quote within 30 minutes. No call centres — you speak directly to the team managing your move.
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
