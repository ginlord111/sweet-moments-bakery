/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  // TypeScript configuration
  typescript: {
    // Set to false if you want to ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  // ESLint configuration
  eslint: {
    // Set to false if you want to ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
