import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { MapPin, ArrowUpRight } from "lucide-react";
import { citiesList as areas } from "@/lib/cities";
import { getSiteSettings } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";

const groupOrder = [
  "Birmingham",
  "Solihull & South Birmingham",
  "Black Country",
  "Walsall & Aldridge",
  "Wolverhampton",
  "Coventry & Warwickshire",
  "Worcestershire & Beyond",
  "Staffordshire",
  "Shropshire & Herefordshire",
];

function areaGroup(area) {
  if (area.tag && groupOrder.includes(area.tag)) return area.tag;
  if (["edgbaston", "harborne", "moseley", "kings-heath", "selly-oak", "erdington", "city-centre"].includes(area.slug)) return "Birmingham";
  if (["solihull", "hall-green", "acocks-green", "quinton"].includes(area.slug)) return "Solihull & South Birmingham";
  if (["dudley", "west-bromwich", "bearwood", "handsworth"].includes(area.slug)) return "Black Country";
  if (area.slug === "wolverhampton") return "Wolverhampton";
  if (area.slug === "coventry") return "Coventry & Warwickshire";
  return "Birmingham";
}

const groupedAreas = groupOrder.map((group) => ({
  group,
  areas: areas
    .filter((area) => areaGroup(area) === group)
    .sort((a, b) => a.name.localeCompare(b.name)),
})).filter((group) => group.areas.length > 0);

export const metadata = makeMeta({
  title: "Removal Areas We Cover | Birmingham & West Midlands",
  description:
    "Birmingham Removals covers Birmingham, the West Midlands and surrounding counties. Choose your area for local removal advice and a fixed quote.",
  path: "/areas",
});

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
              Removal areas across <span className="text-[#F97316]">Birmingham</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">
              We cover moves across Birmingham, the West Midlands, and surrounding counties.
              Click your area for a tailored quote and local knowledge from a crew that knows
              your streets.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {groupedAreas.map(({ group, areas }) => (
              <div key={group}>
                <h2 className="font-[family-name:var(--font-space)] text-3xl font-extrabold text-[#0B1E3F] mb-6">
                  {group}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/areas/${area.slug}`}
                      className="group bg-white border border-slate-200 rounded-lg p-6 hover:border-[#F97316] hover:shadow-lg transition-all relative"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-lg bg-[#0B1E3F] flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#F97316]" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#F97316] group-hover:rotate-45 transition-all" />
                      </div>
                      <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-[#0B1E3F] mb-1 group-hover:text-[#F97316] transition-colors">
                        {area.name}
                      </h3>
                      {area.postcodes ? (
                        <p className="text-xs text-slate-400 font-mono mb-3">{area.postcodes}</p>
                      ) : null}
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {area.shortDescription || area.intro || `Fixed-price removals across ${area.name}.`}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTAStrip settings={settings} />
      </main>
      <Footer />
    </>
  );
}
