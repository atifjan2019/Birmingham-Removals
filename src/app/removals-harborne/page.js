import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
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
  title: "Removals Harborne | Birmingham Removals",
  description:
    "Trusted removals in Harborne B17. Fully insured, 5-star rated removal company covering High Street, War Lane, Queen's Park & all surrounding streets. Free quote today.",
  alternates: { canonical: "https://www.birminghamremovals.uk/removals-harborne" },
  openGraph: {
    title: "Removals Harborne | Birmingham Removals",
    description:
      "Trusted removals in Harborne B17. Fully insured, 5-star rated removal company covering High Street, War Lane, Queen's Park & all surrounding streets.",
    type: "website",
    url: "https://www.birminghamremovals.uk/removals-harborne",
  },
};

const services = [
  {
    icon: Home,
    name: "House Removals Harborne",
    desc: "Full house moves across Harborne — from period semis off War Lane to family homes near Queen's Park. Every job is planned, packed and delivered without stress.",
  },
  {
    icon: Building2,
    name: "Flat Removals Harborne",
    desc: "Specialist flat removals in Harborne's converted Victorian houses and modern apartment developments. Parking, lift access and entry codes arranged well in advance.",
  },
  {
    icon: Truck,
    name: "Man and Van Harborne",
    desc: "Flexible man and van service in Harborne for single-room moves, student relocations and light loads — ideal for the many 1- and 2-bed properties throughout B17.",
  },
  {
    icon: Building2,
    name: "Office Removals Harborne",
    desc: "Out-of-hours office removals for Harborne's clinics, consultancies and High Street businesses — zero disruption to your working day.",
  },
  {
    icon: Package,
    name: "Packing Service",
    desc: "Full or part-packing service using double-walled boxes and specialist wrapping. We protect china, artwork and antiques — common in Harborne's older period homes.",
  },
  {
    icon: Warehouse,
    name: "Storage & Removals",
    desc: "Combined storage and removal in Harborne — perfect for chain breaks or bridging gaps between completion dates in this busy family-move market.",
  },
];

const whyUs = [
  {
    title: "Harborne Street-Level Knowledge",
    desc:
      "We know the permit zones on Harborne High Street, the narrow access on Metchley Lane and which side roads allow double-parking for loading without causing issues.",
  },
  {
    title: "Fully Insured as Standard",
    desc:
      "£10m goods-in-transit and £5m public liability cover on every Harborne job — protecting the period furniture and family heirlooms so common in B17 homes.",
  },
  {
    title: "Fixed, Transparent Pricing",
    desc:
      "No weekend premiums, no stair surcharges, no surprises. Your written quote is your final price — always.",
  },
  {
    title: "5-Star Rated in Harborne",
    desc:
      "We've built a 4.9-star Google rating on the back of hundreds of Harborne and Birmingham-wide reviews. Families recommend us to their neighbours — that's our best advert.",
  },
];

const faqs = [
  {
    q: "How much does a removal in Harborne cost?",
    a: "A typical Harborne 2–3 bedroom house move costs between £350–£800 depending on volume, access and destination. Victorian semis with original staircases and long paths are quoted accurately once we've noted the property layout. Contact us for a free, itemised quote — usually returned within 30 minutes.",
  },
  {
    q: "Do you cover the Harborne postcode — B17?",
    a: "Yes. We cover all of B17 including Harborne village, the streets around Queen's Park, the War Lane corridor and the Lordswood Road area bordering Quinton. There is no travel surcharge for the B17 postcode.",
  },
  {
    q: "Can you help with parking restrictions on Harborne High Street?",
    a: "Absolutely. Harborne High Street operates permit and double-yellow restrictions throughout the day. We plan loading either early morning or apply for a Birmingham City Council bay suspension where needed, so your removal doesn't create a headache for neighbours or the crew.",
  },
  {
    q: "Do you offer same-day removals in Harborne?",
    a: "Yes, subject to van availability. Same-day man and van jobs in Harborne are common — call before 10 am and we'll confirm a slot. Larger full-house moves require at least 48 hours' notice so we can allocate the right van size and crew.",
  },
  {
    q: "Can you handle moves from a Victorian semi in Harborne?",
    a: "Yes — Victorian semis in Harborne typically have tiled paths, bay-windowed front rooms and tight staircase bends. Our crews carry furniture straps, stair-slides and full blanket-wrap as standard, protecting both your furniture and the original woodwork and plasterwork throughout.",
  },
];

export default async function RemovalsHarbornePage() {
  const settings = await getSiteSettings();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Birmingham Removals — Harborne",
    url: "https://www.birminghamremovals.uk/removals-harborne",
    telephone: "+441216660000",
    areaServed: "Harborne, Birmingham",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birmingham",
      addressLocality: "Birmingham",
      postalCode: "B17",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.4567,
      longitude: -1.9615,
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
            Serving Harborne B17 and surrounding streets
          </span>

          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Removals in{" "}
            <span className="text-[#F97316]">Harborne</span>
            , Birmingham
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6">
            Birmingham Removals delivers professional, fully insured house and office removals
            across Harborne B17. From Victorian semis off War Lane to modern apartments near
            Harborne High Street, our experienced local crew handles every lift, wrap and load
            with care. Trusted by Harborne families and businesses since 2015.
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
              Our Removal Services in Harborne
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Every service delivered by our Birmingham-based crew — no agency staff, no subcontracting.
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

      <HowItWorks />

      {/* ── Local Area ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">
              Local Knowledge
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F]">
              Moving to or from Harborne?
            </h2>
          </div>

          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Harborne sits around 3 miles south-west of Birmingham city centre, tucked between
              Edgbaston to the east and Quinton to the west. The B17 postcode covers a tight-knit
              residential village that has become one of the most desirable places to live in
              Birmingham — thanks to its independent High Street, Queen&apos;s Park, well-regarded
              schools and strong sense of community. As your local removal company in Harborne, we
              operate here every week and know exactly which roads get busy at school-run time and
              where loading space is most easily arranged.
            </p>
            <p>
              The housing in Harborne is overwhelmingly Victorian and Edwardian — bay-fronted semis
              and detached homes line the streets off War Lane, Lordswood Road and Metchley Lane.
              Many properties have original tiled paths, steep front steps and original banisters
              that require care. Our man and van Harborne service is popular for the many 1- and
              2-bed conversions dotted through the area, while our full-crew service handles
              4-bedroom family homes with ease. Period properties are our bread and butter — we
              carry stair-slides and furniture blankets on every job.
            </p>
            <p>
              Harborne sits between several areas we cover regularly. Families frequently move
              between Harborne and{" "}
              <Link href="/removals-edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Edgbaston
              </Link>
              ,{" "}
              <Link href="/removals-selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Selly Oak
              </Link>{" "}
              and{" "}
              <Link href="/removals-moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Moseley
              </Link>
              . Whether you&apos;re upsizing to a detached near Queen&apos;s Park or downsizing to
              a village-centre apartment, our removal company Harborne residents have trusted for
              over a decade will make it seamless. We also handle inter-area moves to{" "}
              <Link href="/removals-kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
                Kings Heath
              </Link>{" "}
              and beyond — one crew, one quote, one move.
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
              Why Choose Birmingham Removals in Harborne
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
              Removals Harborne — Frequently Asked Questions
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
            Get a Free Quote for Removals in Harborne
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Share your move date, B17 postcode and rough volume and we&apos;ll return a fixed,
            no-obligation quote within 30 minutes. No call centres — you deal directly with the
            team running your move.
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
