import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Areas We Cover | Newcastle Removals",
  description: "Browse the major areas and postcodes covered by Newcastle Removals across Newcastle, Gateshead, and North Tyneside.",
};

import { areasList as areas } from "./data";

export default function AreasIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Areas We Cover
            </h1>
            <p className="text-lg text-muted">
              We provide fully insured, premium removal services across Newcastle upon Tyne and the surrounding North East regions. Find your local area below to see specific services and local benefits.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {areas.map((area) => (
              <Link
                key={area.id}
                href={`/areas/${area.id}`}
                className="group relative bg-white border border-gray-200 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 text-xl shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 font-semibold text-xs rounded-full mb-3">
                    {area.tag}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-[.hover]:text-primary transition-colors">
                    {area.name}
                  </h2>
                  <p className="text-muted text-sm mb-8">
                    Discover specialized local knowledge, pricing, and removal teams operating locally in {area.name}.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  View Area Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
