/** @type {import('next').NextConfig} */

// Legacy dynamic area routes that now have dedicated landing pages.
const AREA_REDIRECTS = [
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

const nextConfig = {
  // Modern-browser target is driven by .browserslistrc, which Next.js + SWC
  // respect automatically (since 12.2) — SWC stops emitting ES5
  // polyfills/transforms for browsers that no longer exist (~14 KiB saved).
  // Note: there is no `experimental.browsersListForSwc` flag in Next 16
  // (it is an unrecognized key and a no-op), so .browserslistrc is the
  // sole, correct mechanism.

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
      // Legacy /areas/[slug] → dedicated /removals-[slug] pages (301)
      ...AREA_REDIRECTS.map((slug) => ({
        source: `/areas/${slug}`,
        destination: `/removals-${slug}`,
        statusCode: 301,
      })),
    ];
  },

  async headers() {
    return [
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
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://web-sdk.smartlook.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://images.unsplash.com https://www.birminghamremovals.uk",
              "connect-src 'self' https://web-sdk.smartlook.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

// Run `ANALYZE=true npm run build` to inspect the client bundle.
// @next/bundle-analyzer is imported only when explicitly enabled, so the
// default build does not require it as a dependency.
let configToExport = nextConfig;
if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });
  configToExport = withBundleAnalyzer(nextConfig);
}

export default configToExport;
