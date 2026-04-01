"use client";

import { Truck, Phone, Mail, MapPin, Globe, ExternalLink, Star } from "lucide-react";

const quickLinks = [
  { label: "House Removals", href: "#services" },
  { label: "Office Removals", href: "#services" },
  { label: "Man & Van", href: "#services" },
  { label: "Packing Service", href: "#services" },
  { label: "Storage Solutions", href: "#services" },
  { label: "Get a Quote", href: "#quote" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <span className="font-[family-name:var(--font-space)] font-bold text-lg">
                Swift Removals
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Newcastle&apos;s most trusted removals team. We take the stress out
              of moving so you can focus on what matters — settling into your new
              home or office.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all"
                aria-label="Facebook"
              >
                <Globe className="w-5 h-5 text-muted" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all"
                aria-label="Instagram"
              >
                <ExternalLink className="w-5 h-5 text-muted" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all"
                aria-label="Google Reviews"
              >
                <Star className="w-5 h-5 text-muted" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-space)] font-bold text-foreground mb-6">
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
            <h3 className="font-[family-name:var(--font-space)] font-bold text-foreground mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:01234567890"
                  className="text-muted text-sm hover:text-foreground transition-colors"
                >
                  0191 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@swiftremovalsnewcastle.co.uk"
                  className="text-muted text-sm hover:text-foreground transition-colors"
                >
                  info@swiftremovalsnewcastle.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted text-sm">
                  Swift Removals
                  <br />
                  Newcastle upon Tyne
                  <br />
                  NE1 4XF
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Swift Removals Newcastle. All rights
            reserved.
          </p>
          <p className="text-muted text-xs">
            Serving Newcastle, Gateshead &amp; Tyneside
          </p>
        </div>
      </div>
    </footer>
  );
}
