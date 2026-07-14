import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import CTAStrip from "@/components/CTAStrip";
import { BreadcrumbBar } from "@/components/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";
import { getSiteSettings } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";
import { BUSINESS } from "@/config/business";
import blogPosts, { getPostBySlug, getAllPostSlugs } from "@/lib/blogData";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// All posts live in lib/blog — the list above is exhaustive, so 404 unknown
// slugs at the router rather than rendering + ISR-caching them (bot-probed
// junk URLs were burning Vercel ISR write units).
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return makeMeta({
    title: `${post.title} | Birmingham Removals`,
    absoluteTitle: true,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.image,
  });
}

function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const settings = await getSiteSettings();
  const headings = post.sections.map((s) => ({ text: s.heading, id: slugifyHeading(s.heading) }));
  const showToc = post.sections.length > 3;

  const schemas = [
    articleSchema(post),
    breadcrumbSchema([
      { name: "Home", url: BUSINESS.url },
      { name: "Blog", url: `${BUSINESS.url}/blog` },
      { name: post.title, url: `${BUSINESS.url}/blog/${post.slug}` },
    ]),
    ...(Array.isArray(post.faqs) && post.faqs.length > 0 ? [faqSchema(post.faqs)] : []),
  ];

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={schemas} />
      <Navbar settings={settings} />
      <BreadcrumbBar
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />

      <main>
        <article>
          <header className="bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  By{" "}
                  <Link href="/about" className="font-semibold text-white hover:text-[#F97316] transition-colors">
                    {post.author}
                  </Link>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              {post.updated && post.updated !== post.date && (
                <p className="mt-2 text-xs text-white/60">
                  Last updated{" "}
                  <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </p>
              )}
            </div>
          </header>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {post.excerpt && (
              <p className="text-lg text-slate-700 leading-relaxed font-medium mb-8">
                {post.excerpt}
              </p>
            )}

            {showToc && (
              <nav aria-label="Table of contents" className="mb-10 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h2 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-sm uppercase tracking-wider mb-3">
                  On this page
                </h2>
                <ol className="space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-[#F97316] hover:underline underline-offset-2">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="space-y-10">
              {post.sections.map((section, i) => (
                <section key={i} id={slugifyHeading(section.heading)} className="scroll-mt-24">
                  <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl font-extrabold text-[#0B1E3F] leading-tight mb-4">
                    {section.heading}
                  </h2>
                  {section.paragraphs && (
                    <div className="space-y-4 text-slate-700 leading-relaxed [&_a]:text-[#F97316] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#EA580C] [&_strong]:text-[#0B1E3F]">
                      {section.paragraphs.map((p, j) => (
                        // Content authored in-repo (trusted); allows inline links and bold.
                        <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                  )}
                  {section.table && (
                    <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#0B1E3F] text-white">
                          <tr>
                            {section.table.headers.map((h, j) => (
                              <th key={j} className="px-4 py-3 font-[family-name:var(--font-space)] font-bold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {section.table.rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 ? "bg-slate-50" : "bg-white"}>
                              {row.map((cell, ci) => (
                                <td key={ci} className={`px-4 py-3 ${ci === 0 ? "font-semibold text-[#0B1E3F]" : "text-slate-600"}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {section.list && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-slate-700 leading-relaxed [&_a]:text-[#F97316] [&_a]:font-semibold [&_a]:underline"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {Array.isArray(post.faqs) && post.faqs.length > 0 && (
              <section className="mt-14">
                <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl font-extrabold text-[#0B1E3F] mb-5">
                  Frequently asked questions
                </h2>
                <div className="space-y-3">
                  {post.faqs.map((faq, i) => (
                    <details key={i} className="group rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                      <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-[family-name:var(--font-space)] font-bold text-[#0B1E3F]">
                        <span>{faq.q}</span>
                        <span className="shrink-0 w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                      </summary>
                      <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-white">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* End CTA */}
            <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#0B1E3F] to-[#1E3A8A] text-white text-center">
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-extrabold mb-2">
                Need a removal in Birmingham?
              </h2>
              <p className="text-white/80 mb-6">Get your free, fixed-price quote in 30 minutes.</p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-14 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-extrabold text-[#0B1E3F] mb-6">
                Related guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#F97316]/40 hover:shadow-md transition-all"
                  >
                    <h3 className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] leading-snug mb-2">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTAStrip settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
