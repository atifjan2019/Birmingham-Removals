import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { getSiteSettings, telHref } from "@/lib/siteSettings";

function formatWhatsAppNumber(input) {
  let digits = String(input || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("44")) digits = "0" + digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return digits;
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24Zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.687 5.566l-.99 3.611 3.792-.995Zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01a1.094 1.094 0 0 0-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413Z" />
    </svg>
  );
}

export const metadata = {
  title: "Contact Birmingham Removals | Get in Touch for a Free Quote",
  description:
    "Speak to Birmingham Removals,call, WhatsApp or email. Free quotes within 30 minutes, 7 days a week. Based in Birmingham city centre, serving the West Midlands.",
  alternates: { canonical: "https://www.birminghamremovals.uk/contact" },
};

function buildChannels(s) {
  const items = [
    {
      icon: Phone,
      title: "Call us",
      value: s.phone,
      href: telHref(s.phone),
      desc: "Mon–Sun · 7am–9pm",
    },
  ];
  if (s.whatsapp) {
    items.push({
      icon: WhatsAppIcon,
      title: "WhatsApp",
      value: formatWhatsAppNumber(s.whatsapp) || s.phone,
      href: s.whatsapp,
      desc: "Quickest reply, 7 days",
    });
  }
  items.push({
    icon: Mail,
    title: "Email",
    value: s.email,
    href: `mailto:${s.email}`,
    desc: "Replies within 1 hour",
  });
  return items;
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const channels = buildChannels(settings);
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-20 pb-24 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider mb-5">
              Get in Touch
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Let&apos;s plan your <span className="text-[#F97316]">Birmingham move</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Call, WhatsApp or email,you&apos;ll speak to a real Birmingham-based coordinator.
              Free, no-obligation quote within 30 minutes.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:bg-white hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0B1E3F] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#F97316] transition-colors">
                    <c.icon className="w-6 h-6 text-[#F97316] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">{c.title}</div>
                  <div className="font-[family-name:var(--font-space)] font-bold text-lg text-[#0B1E3F] mb-1">
                    {c.value}
                  </div>
                  <div className="text-sm text-slate-500">{c.desc}</div>
                </a>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 bg-[#0B1E3F] text-white rounded-3xl p-8 sm:p-10">
                <h3 className="font-[family-name:var(--font-space)] font-extrabold text-2xl mb-6">
                  Visit or write to us
                </h3>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <MapPin className="w-5 h-5 text-[#F97316] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Head Office</div>
                      <div className="text-white/70 text-sm whitespace-pre-line">{settings.address}</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="w-5 h-5 text-[#F97316] shrink-0 mt-1" />
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
                <h3 className="font-[family-name:var(--font-space)] font-extrabold text-2xl text-[#0B1E3F] mb-3">
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
