import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { BreadcrumbBar } from "@/components/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { getSiteSettings } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";
import { BUSINESS } from "@/config/business";
import blogPosts from "@/lib/blogData";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

export const metadata = makeMeta({
  title: "Removals & Moving Advice Blog | Birmingham Removals",
  absoluteTitle: true,
  description:
    "Moving house in Birmingham? Expert guides on removal costs, packing, checklists, storage and the best areas to live, from Birmingham's 5-star removals team.",
  path: "/blog",
});

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogIndex() {
  const settings = await getSiteSettings();
  const schema = webPageSchema({
    type: "CollectionPage",
    path: "/blog",
    name: "Removals & Moving Advice Blog",
    description:
      "Expert removals and moving advice for Birmingham and the West Midlands.",
    breadcrumb: [
      { name: "Home", url: BUSINESS.url },
      { name: "Blog", url: `${BUSINESS.url}/blog` },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <Navbar settings={settings} />
      <BreadcrumbBar items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <main>
        <section className="bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-extrabold leading-tight">
              Moving Advice & Removals Guides
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl">
              Practical guides on moving house in Birmingham, from removal costs and
              packing tips to the best areas to live and when to book your move.
            </p>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#F97316]/40 transition-all"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] flex items-center justify-center p-6">
                    <span className="font-[family-name:var(--font-space)] font-bold text-white text-lg text-center leading-snug">
                      {post.title}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-lg leading-snug mb-2 group-hover:text-[#F97316] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[#F97316] font-semibold text-sm">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTAStrip settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
