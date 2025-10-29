import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin dev requests
  allowedDevOrigins: [
    '10.10.7.85',
    'localhost',
    '127.0.0.1',
  ],

  // Image optimization - allow all remote hosts
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
