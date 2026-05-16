/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Non-www → www (single 301, no chain)
      {
        source: "/:path*",
        has: [{ type: "host", value: "birminghamremovals.uk" }],
        destination: "https://www.birminghamremovals.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
