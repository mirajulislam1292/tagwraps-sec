import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { ensureEcdsaKeypairInEnv } from "./utils/keypair.js";
import { setCsrfCookie, requireCsrf } from "./middleware/csrf.middleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.middleware.js";

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

  // Public verification API (no cookies/CSRF required)
  app.use("/api/v1/verify", verifyRouter);

  // Cookie-auth routes (CSRF protected)
  app.use(requireCsrf);
  app.use("/api/v1/auth", authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

