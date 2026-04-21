"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const serviceLinks = [
  { label: "House Removals", href: "/services/house-removals" },
  { label: "Office Removals", href: "/services/office-removals" },
  { label: "Man & Van", href: "/services/man-and-van" },
  { label: "Packing Service", href: "/services/packing-service" },
  { label: "Storage Solutions", href: "/services/storage-solutions" },
  { label: "Piano & Specialist", href: "/services/piano-and-specialist-items" },
];

const areaLinks = [
  { label: "Edgbaston", href: "/areas/edgbaston" },
  { label: "Harborne", href: "/areas/harborne" },
  { label: "Moseley", href: "/areas/moseley" },
  { label: "Selly Oak", href: "/areas/selly-oak" },
  { label: "Sutton Coldfield", href: "/areas/sutton-coldfield" },
  { label: "Solihull", href: "/areas/solihull" },
  { label: "City Centre", href: "/areas/city-centre" },
  { label: "All Areas →", href: "/areas" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#E55720] flex items-center justify-center">
                <span className="font-[family-name:var(--font-space)] font-extrabold text-white text-lg">B</span>
              </div>
              <div>
                <div className="font-[family-name:var(--font-space)] font-extrabold text-xl">
                  Birmingham <span className="text-[#FF6B35]">Removals</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">
                  West Midlands · Since 2015
                </div>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Birmingham&apos;s most trusted removals team. We take the stress out of moving so
              you can focus on settling into your new home or office.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#FF6B35]">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 text-sm hover:text-[#FF6B35] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#FF6B35]">
              Areas
            </h3>
            <ul className="space-y-3">
              {areaLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 text-sm hover:text-[#FF6B35] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#FF6B35]">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 text-sm hover:text-[#FF6B35] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#FF6B35]">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <a href="tel:+447888862003" className="text-white/80 hover:text-white transition-colors">
                  0788 886 2003
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <a href="mailto:info@birminghamremovals.uk" className="text-white/80 hover:text-white transition-colors">
                  info@birminghamremovals.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span className="text-white/80">
                  Birmingham City Centre
                  <br />
                  B1 1AA, West Midlands
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs">
            &copy; {new Date().getFullYear()} Birmingham Removals. All rights reserved.
          </p>
          <p className="text-white/60 text-xs">
            Developed with <span className="text-[#FF6B35]">&hearts;</span> by{" "}
            <a
              href="https://webspires.co.uk?utm_source=birminghamremovals"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-[#FF6B35] transition-colors"
            >
              Webspires
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
