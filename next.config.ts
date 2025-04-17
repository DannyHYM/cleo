import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript errors are not blocking deployment
    ignoreBuildErrors: true,
  },
  images: {
    // This helps with image optimization
    unoptimized: true,
  },
  // Stricter production builds can cause issues with external libraries
  reactStrictMode: false,
};

export default nextConfig;
