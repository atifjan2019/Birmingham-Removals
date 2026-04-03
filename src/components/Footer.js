"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "House Removals", href: "#services" },
  { label: "Office Removals", href: "#services" },
  { label: "Man & Van", href: "#services" },
  { label: "Packing Service", href: "#services" },
  { label: "Storage Solutions", href: "#services" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Sitemap", href: "/sitemap" },
];



export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Newcastle Removals - Newcastle upon Tyne"
                width={200}
                height={64}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Newcastle&apos;s most trusted removals team. We take the stress out
              of moving so you can focus on what matters: settling into your new
              home or office.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-space)] font-bold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-space)] font-bold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:07943480432"
                  className="text-muted text-sm hover:text-gray-900 transition-colors"
                >
                  0794 348 0432
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@newcastleremovals.uk"
                  className="text-muted text-sm hover:text-gray-900 transition-colors"
                >
                  info@newcastleremovals.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted text-sm">
                  Newcastle Removals<br />
                  Newcastle upon Tyne<br />
                  NE1 4XF
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Newcastle Removals. All rights
            reserved.
          </p>
          <p className="text-muted text-xs">
            Developed with <span className="text-primary">&hearts;</span> by{" "}
            <a
              href="https://webspires.co.uk?utm_source=removalsnewcastle"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-900 hover:text-primary transition-colors"
            >
              Webspires
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
