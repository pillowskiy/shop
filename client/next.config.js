/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: process.env.API_URL,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    APP_NAME: process.env.APP_NAME,
  }
}

module.exports = nextConfig
