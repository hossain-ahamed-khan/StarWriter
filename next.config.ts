import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin dev requests
  allowedDevOrigins: [
    '10.10.7.85',
    'localhost',
    '127.0.0.1',
  ],

  // Image optimization for remote patterns
  images: {
    remotePatterns: [
      // Backend API on port 10005 (missing in your config!)
      {
        protocol: 'http',
        hostname: '10.10.7.85',
        port: '10005',  // ← You had 9005, but image is from 10005
        pathname: '/media/**',
      },
      // Production
      {
        protocol: 'https',
        hostname: 'starapi.dsrt321.online',
        pathname: '/media/**',
      },
      // Localhost development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
