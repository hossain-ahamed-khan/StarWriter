import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.7.85',
        port: '9005',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
