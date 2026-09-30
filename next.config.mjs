/** @type {import('next').NextConfig} */

// Cities that previously lived at /removals-{slug}. Their content is now under
// /areas/{slug} (the canonical pattern). 301 the legacy paths so existing link
// equity transfers.
const LEGACY_REMOVALS_REDIRECTS = [
  "edgbaston",
  "harborne",
  "moseley",
  "selly-oak",
  "kings-heath",
  "erdington",
  "sutton-coldfield",
  "northfield",
  "hall-green",
  "solihull",
];

// Area slug rename: short slugs replaced by descriptive borough/district names
// to match the actual administrative geography. 301 the old paths so any
// existing inbound links and indexed URLs forward to the new canonical slug.
const AREA_SLUG_REDIRECTS = [
  ["nuneaton", "nuneaton-and-bedworth"],
  ["cannock", "cannock-chase"],
  ["kidderminster", "wyre-forest"],
  ["telford", "telford-and-wrekin"],
  ["shrewsbury", "shrewsbury-shropshire"],
  ["hereford", "herefordshire"],
  ["malvern", "malvern-hills"],
  ["evesham", "wychavon"],
  ["wombourne", "south-staffordshire"],
  ["leek", "staffordshire-moorlands"],
  ["coleshill", "north-warwickshire"],
];

// The bookings API's origin. The move details form calls it straight from the
// browser (saving answers, uploading photos), so the content security policy
// has to allow it. Same default as src/lib/workerApi.js.
const WORKER_API_ORIGIN = (() => {
  const fallback = "https://birmingham-removals-api.webspires.workers.dev";
  try {
    return new URL(process.env.WORKER_API_URL || fallback).origin;
  } catch {
    return fallback;
  }
})();

const nextConfig = {
  // Modern-browser target is driven by .browserslistrc, which Next.js + SWC
  // respect automatically — SWC stops emitting ES5 polyfills/transforms for
  // browsers that no longer exist.

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async redirects() {
    return [
      // Non-www → www (single 301, no chain)
      {
        source: "/:path*",
        has: [{ type: "host", value: "birminghamremovals.uk" }],
        destination: "https://www.birminghamremovals.uk/:path*",
        permanent: true,
      },
      // Legacy /removals-{slug} → canonical /areas/{slug} (301)
      ...LEGACY_REMOVALS_REDIRECTS.map((slug) => ({
        source: `/removals-${slug}`,
        destination: `/areas/${slug}`,
        permanent: true,
      })),
      // Old short area slugs → renamed descriptive slugs (301)
      ...AREA_SLUG_REDIRECTS.map(([from, to]) => ({
        source: `/areas/${from}`,
        destination: `/areas/${to}`,
        permanent: true,
      })),
    ];
  },

  async headers() {
    return [
      // Long-lived caching for static images
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
      // Short, edge-cacheable HTML defaults. Two exclusions beyond the API and
      // the admin. /_next/: the dev server's script URLs carry no hash, so a
      // browser that cached one kept running old code after an edit (production
      // hashes them and sets its own header). /move-details/: a customer's
      // private page, which no shared cache may keep (its headers are below).
      {
        source: "/((?!api/|admin/|_next/|move-details/).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800" },
        ],
      },
      // Security headers (apply everywhere)
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://web-sdk.smartlook.com https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://images.unsplash.com https://www.birminghamremovals.uk https://maps.googleapis.com https://maps.gstatic.com https://*.google-analytics.com https://www.googletagmanager.com",
              // Google Analytics sends to its regional collectors; Smartlook to its
              // *.smartlook.cloud hosts and, for recording, a worker made from a blob.
              `connect-src 'self' https://web-sdk.smartlook.com https://*.smartlook.com https://*.smartlook.cloud https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://maps.googleapis.com ${WORKER_API_ORIGIN}`,
              "worker-src 'self' blob:",
              // Google Maps embed (keyless iframe on area pages + future /contact).
              "frame-src https://www.google.com https://maps.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      // A customer's private page. Its address holds the key to their enquiry,
      // so it is never cached, never indexed and never sent on as a referrer.
      // Listed after the site-wide rule because the last rule to set a header
      // is the one that applies.
      {
        source: "/move-details/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

let configToExport = nextConfig;
if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });
  configToExport = withBundleAnalyzer(nextConfig);
}

export default configToExport;
