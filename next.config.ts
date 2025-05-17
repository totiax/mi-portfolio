// next.config.js
import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  transpilePackages: ['locomotive-scroll'],
  webpack: (config: Configuration) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'locomotive-scroll': 'locomotive-scroll/dist/locomotive-scroll.esm.js',
    };
    return config;
  },
}

module.exports = nextConfig