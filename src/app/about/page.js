import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import Link from "next/link";
import { ArrowRight, Award, Clock, Heart, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { getSiteSettings, telHref } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { BreadcrumbBar } from "@/components/Breadcrumbs";
import { webPageSchema } from "@/lib/schema";
import { BUSINESS } from "@/config/business";
import servicesData from "@/lib/servicesData";

export const metadata = makeMeta({
  title: "About Us | 5-Star Birmingham Removals Since 2015",
  absoluteTitle: true,
  description:
    "Family run Birmingham removals company since 2015. 5,200+ moves delivered, 4.9-star rating from 312+ reviews. Meet the team behind your stress-free move.",
  path: "/about",
  keywords: [
    "about Birmingham Removals",
    "Birmingham removals company",
    "local movers Birmingham",
    "family-run removals Birmingham",
    "trusted removal company West Midlands",
  ],
});

const values = [
  { icon: Heart, title: "Care First", desc: "We treat your belongings like our own: every box, every piece." },
  { icon: Clock, title: "On Time, Every Time", desc: "Late = 10% off. We've only ever discounted twice in 11 years." },
  { icon: ShieldCheck, title: "Fully Protected", desc: "£10m goods-in-transit and £5m public liability on every job." },
  { icon: Award, title: "Trained Crews", desc: "DBS-checked, in-house trained movers, not day-rate agency staff." },
];

const stats = [
  { value: "5,200+", label: "Moves completed" },
  { value: "312", label: "5-star Google reviews" },
  { value: "11+", label: "Years in Birmingham" },
  { value: "24", label: "Full-time crew" },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const aboutSchema = webPageSchema({
    type: "AboutPage",
    path: "/about",
    name: "About Birmingham Removals | Local Movers Since 2015",
    description:
      "Family-run Birmingham removals company since 2015. 5,200+ moves, 24 full-time crew, 4.9-star average from 312+ reviews.",
    breadcrumb: [
      { name: "Home", url: BUSINESS.url },
      { name: "About", url: `${BUSINESS.url}/about` },
    ],
  });
  const phone = settings.phone || BUSINESS.phoneDisplay;
  // The full Organization (MovingCompany) schema with foundingDate,
  // numberOfEmployees and aggregateRating is emitted site-wide in
  // src/app/layout.js, so /about inherits it. Add a Person schema for the
  // founder here once Section E2 (founder name + bio) is supplied.
  return (
    <>
      <JsonLd data={aboutSchema} />
      <Navbar />
      <BreadcrumbBar items={[{ name: "Home", href: "/" }, { name: "About Us" }]} />
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
              Birmingham&apos;s family-run{" "}
              <span className="text-[#F97316]">removals specialists</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Since 2015 we&apos;ve helped thousands of Birmingham families and businesses move
              without stress, built on care, punctuality and fair prices.
            </p>
          </div>
        </section>

        {/* Who we are */}
        <section id="team" className="py-20 bg-white scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">
              Our Team
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-6 leading-tight">
              Who We Are
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                {BUSINESS.name} is an independent, family-run removals company based in Birmingham, moving homes and
                businesses across the West Midlands since {BUSINESS.foundingYear}. We are a local team, not a booking
                site that passes your job to whoever is free.
              </p>
              <p>
                There are two sides to the team. The office takes your call, works out what your move needs and
                gives you a written, fixed quote. The crews do the lifting: every mover is directly employed,
                DBS-checked and trained in-house, so the people who turn up on the day are ours rather than day-rate
                agency staff.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">
                Built in Birmingham, for Birmingham
              </span>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] mb-6 leading-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Birmingham Removals started in 2015 with one van and a simple belief: moving
                  shouldn&apos;t be stressful. Over a decade later, we&apos;ve kept that belief at the
                  centre of everything we do.
                </p>
                <p>
                  Today we run a modern fleet, employ 24 full-time movers, and cover every
                  postcode from B1 to Solihull, Sutton Coldfield, Dudley and Wolverhampton. Our 24
                  full-time, DBS-checked movers are employed directly, never agency staff. But the
                  job hasn&apos;t changed, show up on time, wrap it properly, and get you into your
                  new home without a scratch.
                </p>
                <p>
                  We&apos;re proudly independent, proudly local, and we answer the phone ourselves,
                  every time.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-team.webp"
                  alt="A family home on moving day"
                  width="640"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-extrabold text-[#0B1E3F] leading-tight">
                What We Do
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We move homes, flats, offices and single items across Birmingham and the West Midlands, and anywhere
                in the UK from here. Packing and storage are handled by the same team, so one quote covers the whole
                job.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesData.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#F97316] transition-colors"
                >
                  <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] group-hover:text-[#9A3412] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.shortDesc}</p>
                </Link>
              ))}
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
              <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">
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

        {/* Reviews and where to find us */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-5">
                <Star className="w-6 h-6 text-[#F97316]" />
              </div>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-extrabold text-[#0B1E3F] mb-3">
                What Our Customers Say
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our customers rate us {BUSINESS.rating.value} out of 5 from {BUSINESS.rating.count} reviews. Read what
                they say about their moves, from single items to full family homes.
              </p>
              <Link
                href="/reviews"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#9A3412] hover:text-[#EA580C] transition-colors"
              >
                Read our customer reviews
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6 text-[#F97316]" />
              </div>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-extrabold text-[#0B1E3F] mb-3">
                Where to Find Us
              </h2>
              <address className="not-italic text-slate-600 leading-relaxed">
                {BUSINESS.legalName}
                <br />
                {BUSINESS.addressDisplay}
              </address>
              <p className="mt-3 text-slate-600">Open Mon to Sun, 7am to 9pm</p>
              <a
                href={telHref(phone)}
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#9A3412] hover:text-[#EA580C] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {phone}
              </a>
            </div>
          </div>
        </section>

        <CTAStrip settings={settings} />
      </main>
      <Footer />
    </>
  );
}
