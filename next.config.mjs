import path from "path";
import { fileURLToPath } from "url";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy Vite build output to Next.js public directory before build
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  const viteDist = path.resolve(__dirname, "dist", "public");
  const nextPublic = path.resolve(__dirname, "public");

  if (existsSync(viteDist)) {
    // Ensure public directory exists
    if (!existsSync(nextPublic)) {
      mkdirSync(nextPublic, { recursive: true });
    }

    // Copy all files from Vite dist to Next.js public
    function copyRecursive(src, dest) {
      const entries = readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          if (!existsSync(destPath)) {
            mkdirSync(destPath, { recursive: true });
          }
          copyRecursive(srcPath, destPath);
        } else {
          copyFileSync(srcPath, destPath);
        }
      }
    }

    try {
      copyRecursive(viteDist, nextPublic);
      console.log("Copied Vite build to Next.js public directory");
    } catch (error) {
      console.error("Error copying Vite build:", error);
    }
  }
}

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
