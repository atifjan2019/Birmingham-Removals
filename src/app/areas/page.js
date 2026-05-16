import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { MapPin, ArrowUpRight, BookOpen } from "lucide-react";
import { areasList as areas } from "./data";
import { getSiteSettings } from "@/lib/siteSettings";

const dedicatedPages = [
  {
    slug: "removals-edgbaston",
    name: "Removals Edgbaston",
    postcode: "B15, B16",
    tag: "Premium Coverage",
    desc: "In-depth guide to house, flat and office removals across Edgbaston — Calthorpe Estate, Hagley Road and beyond.",
  },
  {
    slug: "removals-harborne",
    name: "Removals Harborne",
    postcode: "B17",
    tag: "Village Moves",
    desc: "Full local guide to removals in Harborne — High Street, War Lane, Queen's Park and all surrounding B17 streets.",
  },
  {
    slug: "removals-selly-oak",
    name: "Removals Selly Oak",
    postcode: "B29",
    tag: "Student Moves",
    desc: "Expert removals guide for Selly Oak B29 — student and family moves on Bristol Road A38, Oak Tree Lane and surrounding streets.",
  },
  {
    slug: "removals-moseley",
    name: "Removals Moseley",
    postcode: "B13",
    tag: "Village Character",
    desc: "Local removals guide for Moseley B13 — Moseley Village, Alcester Road, Wake Green Road and the streets around Moseley Bog.",
  },
  {
    slug: "removals-kings-heath",
    name: "Removals Kings Heath",
    postcode: "B14",
    tag: "Local Experts",
    desc: "Complete guide to removals in Kings Heath B14 — High Street, Vicarage Road, Kings Heath Park and all B14 streets.",
  },
  {
    slug: "removals-erdington",
    name: "Removals Erdington",
    postcode: "B23, B24",
    tag: "Fast Response",
    desc: "Trusted removals guide for Erdington B23 & B24 — Six Ways, Chester Road, Castle Vale and Gravelly Hill covered.",
  },
  {
    slug: "removals-sutton-coldfield",
    name: "Removals Sutton Coldfield",
    postcode: "B72–B76",
    tag: "Premium Coverage",
    desc: "Premium removals guide for the Royal Town — Four Oaks, Mere Green, The Parade, Boldmere and all Sutton Coldfield postcodes.",
  },
  {
    slug: "removals-northfield",
    name: "Removals Northfield",
    postcode: "B31",
    tag: "Estate Moves",
    desc: "Local removals guide for Northfield B31 — Longbridge Village, Bristol Road South, West Heath and surrounding estates.",
  },
  {
    slug: "removals-hall-green",
    name: "Removals Hall Green",
    postcode: "B28",
    tag: "Family Suburb",
    desc: "Expert removals guide for Hall Green B28 — Stratford Road, Shaftmoor Lane, Springfield Park and all B28 streets.",
  },
  {
    slug: "removals-solihull",
    name: "Removals Solihull",
    postcode: "B91–B93",
    tag: "Premium Area",
    desc: "Premium removals guide for Solihull B91–B93 — Touchwood, Tudor Grange, Olton, Monkspath and beyond.",
  },
];

export const metadata = {
  title: "Areas We Cover | Birmingham Removals",
  description:
    "Birmingham Removals covers every B postcode,Edgbaston, Harborne, Moseley, Selly Oak, Sutton Coldfield, Solihull, Erdington plus Dudley, Wolverhampton and Coventry.",
  alternates: { canonical: "https://www.birminghamremovals.uk/areas" },
};

export default async function AreasIndexPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider mb-5">
              Coverage
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Birmingham removals, across every <span className="text-[#F97316]">B postcode</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              From Edgbaston to Erdington, Harborne to Sutton Coldfield,our crews know every
              street, estate and high-rise across the West Midlands.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {areas.map((area) => (
                <Link
                  key={area.id}
                  href={`/areas/${area.id}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#F97316] group-hover:rotate-45 transition-all" />
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-[#F97316]/10 text-[#F97316] font-semibold text-[10px] uppercase tracking-wider rounded-full mb-3">
                    {area.tag}
                  </span>
                  <h2 className="font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F] mb-1 group-hover:text-[#F97316] transition-colors">
                    {area.name}
                  </h2>
                  {area.postcode ? (
                    <p className="text-xs text-slate-400 font-mono mb-2">{area.postcode}</p>
                  ) : null}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Local removals team covering {area.name},fully insured, DBS-checked,
                    on-time guaranteed.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* ── Dedicated Area Guides ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-3">
                Deep Dives
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl font-extrabold text-[#0B1E3F]">
                Dedicated Area Removal Guides
              </h2>
              <p className="mt-2 text-slate-500 max-w-xl">
                Full local guides with pricing, FAQs, parking tips and area-specific advice.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dedicatedPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#F97316] group-hover:rotate-45 transition-all" />
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-[#F97316]/10 text-[#F97316] font-semibold text-[10px] uppercase tracking-wider rounded-full mb-3">
                    {page.tag}
                  </span>
                  <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F] mb-1 group-hover:text-[#F97316] transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-2">{page.postcode}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{page.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTAStrip settings={settings} />
      </main>
      <Footer />
    </>
  );
}
