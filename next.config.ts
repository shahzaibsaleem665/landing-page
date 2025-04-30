// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enforces React Strict Mode to help detect potential issues
  images: {
    // Optional: Add any external domains from which you want to load images
    domains: ["your-image-domain.com"], // Replace with actual domains, if needed
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
};

export default nextConfig;
