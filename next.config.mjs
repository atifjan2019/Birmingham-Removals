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
      // Short, edge-cacheable HTML defaults
      {
        source: "/((?!api/|admin/).*)",
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://web-sdk.smartlook.com https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://images.unsplash.com https://www.birminghamremovals.uk https://maps.googleapis.com https://maps.gstatic.com",
              "connect-src 'self' https://web-sdk.smartlook.com https://maps.googleapis.com",
              // Google Maps embed (keyless iframe on area pages + future /contact).
              "frame-src https://www.google.com https://maps.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
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
