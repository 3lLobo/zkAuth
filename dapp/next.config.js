/** @type {import('next').NextConfig} */
require("dotenv").config()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
  env: {
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig
