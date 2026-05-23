import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";

// Three featured reviews surfaced on the homepage. Rendered server-side so the
// quotes ship in the initial HTML for crawlers, with matching Review schema
// emitted from the page that imports this component (see HOMEPAGE_REVIEWS).
export const HOMEPAGE_REVIEWS = [
  {
    name: "Sarah Patel",
    location: "Edgbaston, B15",
    quote:
      "Absolutely brilliant from start to finish. The team arrived exactly on time, wrapped everything with real care, and had us moved into our Edgbaston house by 2pm. Worth every penny.",
    rating: 5,
  },
  {
    name: "James Whitmore",
    location: "Solihull, B91",
    quote:
      "Used them for a 4-bed move from Moseley to Solihull. Fixed price agreed, no surprises, and they even reassembled the kids' bunk bed. Honestly the easiest house move we've ever done.",
    rating: 5,
  },
  {
    name: "Priya Shah",
    location: "Harborne, B17",
    quote:
      "Booked a last-minute man and van for a flat move in Harborne. They came within 2 hours, were polite, careful and charged exactly what they quoted. Recommending to all my friends.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">
            Reviews
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
            What our <span className="text-[#F97316]">Birmingham</span> customers say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex text-[#F97316]" aria-hidden="true">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#0B1E3F]">4.9 / 5</span>
            <span className="text-slate-500">from 312+ Google reviews</span>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOMEPAGE_REVIEWS.map((t) => (
            <li
              key={t.name}
              className="relative bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-[#F97316]/40 transition-all"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#F97316]/10" aria-hidden="true" />
              <div className="flex text-[#F97316] mb-3" aria-label={`Rated ${t.rating} out of 5`}>
                {[...Array(t.rating)].map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-slate-700 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white text-sm font-bold flex items-center justify-center" aria-hidden="true">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-[#0B1E3F] text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.location}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 bg-white text-[#0B1E3F] font-semibold hover:border-[#F97316] hover:text-[#F97316] transition-colors"
          >
            Read all reviews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
