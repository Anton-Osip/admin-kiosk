import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artkiosk2025.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
