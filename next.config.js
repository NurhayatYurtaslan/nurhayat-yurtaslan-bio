/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Ensure the src directory is properly configured
  distDir: '.next',
}

module.exports = nextConfig 