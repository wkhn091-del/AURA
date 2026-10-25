import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: [
        "localhost:3000",
        "aura-audio.vercel.app",
        ...(process.env.NEXT_PUBLIC_SITE_URL
          ? [new URL(process.env.NEXT_PUBLIC_SITE_URL).host]
          : []),
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
