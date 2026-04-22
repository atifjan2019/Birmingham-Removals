import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import servicesData from "@/lib/servicesData";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Removal Services | Birmingham Removals",
  description:
    "Full range of Birmingham removal services: house removals, office relocations, man & van, packing, storage and specialist piano moves across the West Midlands.",
  alternates: { canonical: "https://www.birminghamremovals.uk/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider mb-5">
              Services
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-[#F97316]">Birmingham removals</span>, tailored to you
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Whatever you&apos;re moving — single item, 1-bed flat, 5-bed detached, or a whole
              office — we have the crew, the vans and the Birmingham know-how.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicesData.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#F97316] group-hover:rotate-45 transition-all" />
                  </div>
                  <h2 className="font-[family-name:var(--font-space)] text-xl font-bold mb-3 text-[#0B1E3F] group-hover:text-[#F97316] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTAStrip />
      </main>
      <Footer />
    </>
  );
}
