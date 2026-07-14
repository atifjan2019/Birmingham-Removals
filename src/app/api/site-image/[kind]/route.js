import { getWorkerSettings } from "@/lib/workerApi";

// Serves the admin-uploaded site images (stored in D1 as base64 data URLs)
// as real image responses. Pages reference these URLs instead of inlining the
// data URLs into their markup — inlining put ~1.8 MB of base64 into every
// page's HTML (plus ~1 MB into its RSC payload), multiplying Vercel ISR write
// units roughly 6× site-wide. See lib/siteSettings.js, which rewrites the
// stored data URLs to /api/site-image/<kind>?v=<updatedAt>.
//
// Caching: the settings fetch inside getWorkerSettings() is shared with every
// page (24h window + "site-settings" tag), so this handler almost never hits
// the worker. The response is immutable because the URL is versioned — an
// admin upload changes ?v=, so stale CDN/browser copies are never served.

const KIND_FIELD = {
  logo: "logoUrl",
  "footer-logo": "footerLogoUrl",
  favicon: "faviconUrl",
};

export async function GET(_request, { params }) {
  const { kind } = await params;
  const field = KIND_FIELD[kind];
  if (!field) return new Response("Not found", { status: 404 });

  let value;
  try {
    const settings = await getWorkerSettings();
    value = settings?.[field];
  } catch {
    // Worker unreachable — tell caches not to keep this.
    return new Response("Image unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const match =
    typeof value === "string"
      ? value.match(/^data:([^;,]+)(;base64)?,(.+)$/s)
      : null;
  if (!match) return new Response("Not found", { status: 404 });

  const [, mime, isBase64, data] = match;
  const body = isBase64
    ? Buffer.from(data, "base64")
    : Buffer.from(decodeURIComponent(data), "utf8");

  return new Response(body, {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
