import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import servicesData from "@/lib/servicesData";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export const metadata = {
  title: "Professional Removal Services | Newcastle Removals",
  description: "Explore our range of professional removal services in Newcastle including house removals, office relocations, man and van, and packing.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              Comprehensive Coverage
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
              <span className="text-primary">Removals</span> Tailored To You
            </h1>
            <p className="text-lg text-gray-600">
              No matter what you need moving, we have the team, the vehicles, and the experience to get it done safely and efficiently across Newcastle and the North East.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, i) => (
              <Link href={`/services/${service.slug}`} key={service.slug} className="block group h-full">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  
                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h2 className="relative z-10 font-[family-name:var(--font-space)] text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  
                  <p className="relative z-10 text-gray-600 leading-relaxed mb-8 flex-1">
                    {service.shortDesc}
                  </p>
                  
                  <span className="relative z-10 text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Bottom CTA block */}
          <div className="mt-24 bg-gray-900 rounded-[2.5rem] p-10 sm:p-16 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-4">
                  Need a custom solution?
                </h3>
                <p className="text-gray-300 mb-10 text-lg">
                  If you can't see exactly what you're looking for, get in touch. We can tailor our services to meet your specific requirements.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg text-lg w-full sm:w-auto"
                    >
                    Get a Quote
                    </Link>
                    <a
                    href="tel:+447888862003"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-lg w-full sm:w-auto backdrop-blur-md"
                    >
                    <Phone className="w-5 h-5" />
                    Call Us
                    </a>
                </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
