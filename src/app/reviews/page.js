import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { Star, Quote } from "lucide-react";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = {
  title: "Reviews | Birmingham Removals | 4.9★ from 312+ Customers",
  description:
    "See what Birmingham customers say about our removals service. 4.9 average on Google from 312+ verified reviews. Real stories from real moves across the West Midlands.",
  alternates: { canonical: "https://www.birminghamremovals.uk/reviews" },
};

const reviews = [
  { name: "Sarah Patel", location: "Edgbaston, B15", rating: 5, text: "Absolutely brilliant from start to finish. The team arrived exactly on time, wrapped everything with real care, and had us moved into our Edgbaston house by 2pm. Worth every penny." },
  { name: "James Whitmore", location: "Solihull, B91", rating: 5, text: "Used them for a 4-bed move from Moseley to Solihull. Fixed price agreed, no surprises, and they even reassembled the kids' bunk bed. Honestly the easiest house move we've ever done." },
  { name: "Priya Shah", location: "Harborne, B17", rating: 5, text: "Booked a last-minute man and van for a flat move in Harborne. They came within 2 hours, were polite, careful and charged exactly what they quoted." },
  { name: "Daniel O'Connor", location: "Jewellery Quarter, B3", rating: 5, text: "Office relocation done over a weekend,Monday morning we were up and running. Professional, efficient, and they handled all our IT gear without a single hitch." },
  { name: "Emma Richardson", location: "Sutton Coldfield, B74", rating: 5, text: "We moved from London to Sutton Coldfield with them,smooth, punctual, and they protected my grandmother's antique dresser like their own." },
  { name: "Mohammed Ali", location: "Selly Oak, B29", rating: 5, text: "Best man and van experience ever. Student move from halls to private house,arrived when they said, carried everything up two flights without a grumble." },
  { name: "Helen Carter", location: "Moseley, B13", rating: 5, text: "Packed, moved and unpacked our 3-bed in a single day. The crew were lovely with the kids and the dog. Will 100% use again." },
  { name: "Tom Bradley", location: "Kings Heath, B14", rating: 5, text: "Clear pricing, polite crew, and they even took our old sofa to the tip for us. Small thing, but it's the small things that count." },
  { name: "Aisha Bhatti", location: "Erdington, B23", rating: 5, text: "Needed a piano moved up two floors. Specialist team came with proper kit, moved it in under an hour, not a scratch. Fair price too." },
];

export default async function ReviewsPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-20 pb-20 bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-1 mb-4 text-[#F97316]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-7 h-7 fill-current" />)}
            </div>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-[#F97316]">4.9 / 5</span> from 312+ Birmingham customers
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Real reviews from real West Midlands moves. Here&apos;s what our customers say.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition-shadow relative">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-[#F97316]/10" />
                  <div className="flex text-[#F97316] mb-3">
                    {[...Array(r.rating)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                  <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white text-sm font-bold flex items-center justify-center">
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-[#0B1E3F] text-sm">{r.name}</div>
                      <div className="text-slate-500 text-xs">{r.location}</div>
                    </div>
                  </div>
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
