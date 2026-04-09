import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { ensureEcdsaKeypairInEnv } from "./utils/keypair.js";
import { setCsrfCookie, requireCsrf } from "./middleware/csrf.middleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.middleware.js";
import { prisma } from "./prisma/client.js";

import { authRouter } from "./routes/auth.routes.js";
import { verifyRouter } from "./routes/verify.routes.js";

dotenv.config();
ensureEcdsaKeypairInEnv();

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(setCsrfCookie);

  app.get("/health", (req, res) => res.json({ ok: true }));
  app.get("/health/db", async (req, res) => {
    try {
      // Simple connectivity check; does not expose secrets.
      await prisma.$queryRaw`SELECT 1`;
      res.json({ ok: true, db: "connected" });
    } catch (e) {
      res.status(500).json({
        ok: false,
        db: "error",
        error: e?.message || "DB connection failed",
      });
    }
  });

  // Public verification API (no cookies/CSRF required)
  app.use("/api/v1/verify", verifyRouter);

  // Cookie-auth routes (CSRF protected)
  app.use(requireCsrf);
  app.use("/api/v1/auth", authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

