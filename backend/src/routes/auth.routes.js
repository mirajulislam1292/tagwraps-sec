import { Router } from "express";
import {
  forgotPassword,
  listSessions,
  login,
  logout,
  me,
  refresh,
  register,
  resendOtp,
  resetPassword,
  revokeOtherSessions,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { requireAuth, requireRoles } from "../middleware/auth.middleware.js";
import {
  loginLimiter,
  passwordResetLimiter,
  registerLimiter,
} from "../middleware/rateLimit.middleware.js";

export const authRouter = Router();

authRouter.post("/register", registerLimiter, register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/login", loginLimiter, login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

authRouter.post("/forgot-password", passwordResetLimiter, forgotPassword);
authRouter.post("/reset-password/:token", passwordResetLimiter, resetPassword);

authRouter.get("/me", requireAuth, me);
authRouter.get(
  "/sessions",
  requireAuth,
  requireRoles(["SUPER_ADMIN", "MANUFACTURER", "STAFF"]),
  listSessions
);
authRouter.post(
  "/sessions/revoke-others",
  requireAuth,
  requireRoles(["SUPER_ADMIN", "MANUFACTURER", "STAFF"]),
  revokeOtherSessions
);

