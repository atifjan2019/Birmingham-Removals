import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { areasList } from "../areas/data";
import { Map, MapPin, Search, Navigation } from "lucide-react";

export const metadata = {
  title: "HTML Sitemap | Newcastle Removals",
  description: "Navigate all pages on the Newcastle Removals website.",
};

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Website Directory
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Sitemap
            </h1>
            <p className="text-lg text-muted">
              Easily navigate to any section of our website. Find our core services, obtain a quick quote, or search for dedicated removal teams operating in your specific local area.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Pages Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-primary" />
                  Main Pages
                </h2>
                <ul className="space-y-4 relative z-10">
                  <li>
                    <Link href="/" className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                      <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Home (Services)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/quote" className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                      <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Get a Free Quote</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/areas" className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                      <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Areas We Cover (Index)</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Areas Grid Column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Map className="w-6 h-6 text-primary" />
                  Coverage Areas
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-4 relative z-10">
                  {areasList.map((area) => (
                    <li key={area.id}>
                      <Link href={`/areas/${area.id}`} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                          <MapPin className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                          Removals in {area.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
