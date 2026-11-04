import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  webpack(config, { dev }) {
    if (dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
