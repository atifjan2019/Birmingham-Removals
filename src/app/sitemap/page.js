import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { areasList } from "../areas/data";
import servicesData from "@/lib/servicesData";
import { Map, MapPin, Navigation, Briefcase } from "lucide-react";

export const metadata = {
  title: "HTML Sitemap | Birmingham Removals",
  description: "Navigate every page on the Birmingham Removals website.",
  alternates: { canonical: "https://www.birminghamremovals.uk/sitemap" },
};

const mainPages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "All Services" },
  { href: "/areas", label: "All Areas" },
  { href: "/quote", label: "Get a Free Quote" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Customer Reviews" },
];

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-20">
        <section className="bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-extrabold">
              Sitemap
            </h1>
            <p className="mt-4 text-white/80">Every page on birminghamremovals.uk</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-7 border border-slate-200">
              <h2 className="font-[family-name:var(--font-space)] font-bold text-lg text-[#0B1E3F] mb-5 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#F97316]" /> Main Pages
              </h2>
              <ul className="space-y-2">
                {mainPages.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-slate-700 hover:text-[#F97316] text-sm">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200">
              <h2 className="font-[family-name:var(--font-space)] font-bold text-lg text-[#0B1E3F] mb-5 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#F97316]" /> Services
              </h2>
              <ul className="space-y-2">
                {servicesData.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-slate-700 hover:text-[#F97316] text-sm">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200">
              <h2 className="font-[family-name:var(--font-space)] font-bold text-lg text-[#0B1E3F] mb-5 flex items-center gap-2">
                <Map className="w-5 h-5 text-[#F97316]" /> Coverage Areas
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {areasList.map((a) => (
                  <li key={a.id}>
                    <Link href={`/areas/${a.id}`} className="text-slate-700 hover:text-[#F97316] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-300" />
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
