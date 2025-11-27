import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // Try to serve the built Vite app from public directory
  // The next.config.mjs copies the Vite build to public/ during build
  try {
    const publicPath = join(process.cwd(), "public", "index.html");
    if (existsSync(publicPath)) {
      const html = readFileSync(publicPath, "utf-8");
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
  } catch (error) {
    console.error("Failed to load built app:", error);
  }

  // Fallback: try dist/public as backup
  try {
    const distPath = join(process.cwd(), "dist", "public", "index.html");
    if (existsSync(distPath)) {
      const html = readFileSync(distPath, "utf-8");
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
  } catch (error) {
    console.error("Failed to load from dist:", error);
  }

  notFound();
}

