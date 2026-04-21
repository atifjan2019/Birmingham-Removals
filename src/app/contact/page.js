import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Birmingham Removals | Get in Touch for a Free Quote",
  description:
    "Speak to Birmingham Removals — call, WhatsApp or email. Free quotes within 30 minutes, 7 days a week. Based in Birmingham city centre, serving the West Midlands.",
  alternates: { canonical: "https://www.birminghamremovals.uk/contact" },
};

const channels = [
  {
    icon: Phone,
    title: "Call us",
    value: "0788 886 2003",
    href: "tel:+447888862003",
    desc: "Mon–Sun · 7am–9pm",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "0788 886 2003",
    href: "https://wa.me/447888862003",
    desc: "Quickest reply, 7 days",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@birminghamremovals.uk",
    href: "mailto:info@birminghamremovals.uk",
    desc: "Replies within 1 hour",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-20 pb-24 bg-gradient-to-br from-[#0A2540] to-[#14375C] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider mb-5">
              Get in Touch
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Let&apos;s plan your <span className="text-[#FF6B35]">Birmingham move</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Call, WhatsApp or email — you&apos;ll speak to a real Birmingham-based coordinator.
              Free, no-obligation quote within 30 minutes.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-[#FF6B35] hover:bg-white hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0A2540] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#FF6B35] transition-colors">
                    <c.icon className="w-6 h-6 text-[#FF6B35] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">{c.title}</div>
                  <div className="font-[family-name:var(--font-space)] font-bold text-lg text-[#0A2540] mb-1">
                    {c.value}
                  </div>
                  <div className="text-sm text-slate-500">{c.desc}</div>
                </a>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 bg-[#0A2540] text-white rounded-3xl p-8 sm:p-10">
                <h3 className="font-[family-name:var(--font-space)] font-extrabold text-2xl mb-6">
                  Visit or write to us
                </h3>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Head Office</div>
                      <div className="text-white/70 text-sm">
                        Birmingham City Centre
                        <br />
                        B1 1AA, West Midlands
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="w-5 h-5 text-[#FF6B35] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Working Hours</div>
                      <div className="text-white/70 text-sm">
                        Monday – Sunday
                        <br />
                        7am – 9pm (incl. bank holidays)
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
                <h3 className="font-[family-name:var(--font-space)] font-extrabold text-2xl text-[#0A2540] mb-3">
                  Need a fast quote?
                </h3>
                <p className="text-slate-600 mb-6">
                  Our online booking form takes under 2 minutes and gives you a fixed,
                  all-inclusive price.
                </p>
                <Link
                  href="/quote"
                  className="btn-accent inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold"
                >
                  Start my free quote →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
