import { BUSINESS } from "@/config/business";
import blogPosts from "@/lib/blogData";

export const dynamic = "force-static";

function xml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  // blogPosts is newest first by publish date; the feed date follows the
  // latest change to any post, so it only moves when the content does.
  const stamp = (post) => post.updated || post.date;
  const latest = blogPosts.map(stamp).sort().at(-1);
  const items = blogPosts
    .map((post) => {
      const url = `${BUSINESS.url}/blog/${post.slug}`;
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${xml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(BUSINESS.name)} Moving Guides</title>
    <link>${BUSINESS.url}/blog</link>
    <description>Moving guides for Birmingham and the West Midlands: costs, packing, checklists and the best areas to live.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date(`${latest}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${BUSINESS.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
