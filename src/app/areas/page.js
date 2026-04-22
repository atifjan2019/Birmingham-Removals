import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { MapPin, ArrowUpRight } from "lucide-react";
import { areasList as areas } from "./data";
import { getSiteSettings } from "@/lib/siteSettings";

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
        <CTAStrip settings={settings} />
      </main>
      <Footer />
    </>
  );
}
