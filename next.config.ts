import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      // Montana Cans mockup — statický export bundlovaný do public/montana/
      // při buildu (viz portfolio/package.json → build:montana). Rewrite zajistí,
      // že /montana a /montana/ servírují index.html, místo aby Next router vracel 404.
      {
        source: "/montana",
        destination: "/montana/index.html",
      },
      {
        source: "/montana/",
        destination: "/montana/index.html",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/ingest/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
