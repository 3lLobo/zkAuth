/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    config.resolve.extensions = [
      '*',
      '.mjs',
      '.js',
      'jsx',
      '.ts',
      '.tsx',
      '.json',
    ]
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    return config
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
