import type { VercelRequest, VercelResponse } from "@vercel/node";
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { registerRoutes } from "../server/routes";

// Create Express app instance
const app: Express = express();

// Apply Express middleware (matching server/app.ts)
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// Add logging middleware (matching server/app.ts)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Register all API routes (we don't need the Server return value for Vercel)
let routesRegistered = false;

async function ensureRoutesRegistered() {
  if (!routesRegistered) {
    await registerRoutes(app);

    // Error handling middleware should be registered AFTER routes (matching server/app.ts)
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
    });

    routesRegistered = true;
  }
}

// Export the handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure routes are registered
  await ensureRoutesRegistered();

  // Handle the request with Express
  return new Promise<void>((resolve, reject) => {
    app(req as any, res as any, (err?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
