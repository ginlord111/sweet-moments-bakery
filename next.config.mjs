import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  // Transpile packages/directories that need to be processed
  transpilePackages: [],
  // Webpack configuration to handle path aliases and server directory
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@shared": path.resolve(__dirname, "shared"),
        "@server": path.resolve(__dirname, "server"),
      };
    }
    return config;
  },
};

export default nextConfig;
