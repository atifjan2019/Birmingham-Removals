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
