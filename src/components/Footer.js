"use client";

import { Phone, Mail, MapPin } from "lucide-react";
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

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Twitter", href: "#", icon: TwitterIcon },
];

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 8.4V6.9c0-.7.5-.9.9-.9h2.3V2.2L14.2 2c-3.2 0-4.9 1.9-4.9 5.3v1.1H6v4.2h3.3V22h4.2v-9.4h3.3l.5-4.2h-3.1Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect width="17" height="17" x="3.5" y="3.5" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2.8h3.3l-7.1 8.1 8.4 10.3h-6.6l-5.1-6.3-5.9 6.3H2.6l7.6-8.6-8-9.8h6.8l4.6 5.8 5.3-5.8Zm-1.2 16.6h1.8L8 4.5H6L17.7 19.4Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0B1E3F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
                <span className="font-[family-name:var(--font-space)] font-extrabold text-white text-lg">B</span>
              </div>
              <div>
                <div className="font-[family-name:var(--font-space)] font-extrabold text-xl">
                  Birmingham <span className="text-[#F97316]">Removals</span>
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
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#F97316]">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 text-sm hover:text-[#F97316] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#F97316]">
              Areas
            </h3>
            <ul className="space-y-3">
              {areaLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 text-sm hover:text-[#F97316] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#F97316]">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 text-sm hover:text-[#F97316] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-space)] font-bold mb-5 text-sm uppercase tracking-wider text-[#F97316]">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <a href="tel:+447365380090" className="text-white/80 hover:text-white transition-colors">
                  07365 380090
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <a href="mailto:info@birminghamremovals.uk" className="text-white/80 hover:text-white transition-colors">
                  info@birminghamremovals.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
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
            Developed with <span className="text-[#F97316]">&hearts;</span> by{" "}
            <a
              href="https://webspires.co.uk?utm_source=birminghamremovals"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-[#F97316] transition-colors"
            >
              Webspires
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
