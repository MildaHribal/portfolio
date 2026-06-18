/**
 * basePath '/montana' is applied only for the static export build.
 * In `next dev` we keep the root path so the site is reachable at
 * http://localhost:3000/ without having to remember the prefix.
 *
 * Pass BASE_PATH=/whatever to override (e.g. when deploying to a different sub-path).
 */
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.BASE_PATH ?? (isProd ? '/montana' : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
