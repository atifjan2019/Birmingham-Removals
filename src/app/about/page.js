import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { Award, Users, MapPin, Heart, Clock, ShieldCheck } from "lucide-react";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = {
  title: "About Us — Birmingham Removals | Our Story & Values",
  description:
    "Meet the Birmingham Removals team. Family-run since 2015, 5,200+ successful moves, and a relentless focus on zero-stress relocations across the West Midlands.",
  alternates: { canonical: "https://www.birminghamremovals.uk/about" },
};

const values = [
  { icon: Heart, title: "Care First", desc: "We treat your belongings like our own — every box, every piece." },
  { icon: Clock, title: "On Time, Every Time", desc: "Late = 10% off. We've only ever discounted twice in 10 years." },
  { icon: ShieldCheck, title: "Fully Protected", desc: "£10m goods-in-transit and £5m public liability on every job." },
  { icon: Award, title: "Trained Crews", desc: "DBS-checked, in-house trained movers — not day-rate agency staff." },
];

const stats = [
  { value: "5,200+", label: "Moves completed" },
  { value: "312", label: "5-star Google reviews" },
  { value: "10+", label: "Years in Birmingham" },
  { value: "24", label: "Full-time crew" },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-20 pb-24 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-[#F97316]/10 blur-3xl rounded-full" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider mb-5">
              About Us
            </span>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Birmingham&apos;s family-run
              <br />
              <span className="text-[#F97316]">removals specialists</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Since 2015 we&apos;ve helped thousands of Birmingham families and businesses move
              without stress — built on care, punctuality and fair prices.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
                Our Story
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-6 leading-tight">
                Built in Birmingham, for Birmingham
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Birmingham Removals started in 2015 with one van and a simple belief: moving
                  shouldn&apos;t be stressful. A decade later, we&apos;ve kept that belief at the
                  centre of everything we do.
                </p>
                <p>
                  Today we run a modern fleet, employ 24 full-time movers, and cover every
                  postcode from B1 to Solihull, Sutton Coldfield, Dudley and Wolverhampton. But the
                  job hasn&apos;t changed — show up on time, wrap it properly, and get you into your
                  new home without a scratch.
                </p>
                <p>
                  We&apos;re proudly independent, proudly local, and we answer the phone ourselves —
                  every time.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop"
                  alt="Birmingham Removals crew"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#0B1E3F] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-[family-name:var(--font-space)] text-4xl lg:text-5xl font-extrabold text-[#F97316]">{s.value}</div>
                <div className="mt-2 text-white/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
                Our Values
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] leading-tight">
                Four promises we keep on every move
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#F97316] hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-space)] font-bold text-lg text-[#0B1E3F] mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTAStrip settings={settings} />
      </main>
      <Footer />
    </>
  );
}
