/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: process.env.API_URL,
    API_URL: process.env.API_URL,
  }
}

module.exports = nextConfig
