import crypto from "crypto";

export function setCsrfCookie(req, res, next) {
  const token = req.cookies?.csrf_token;
  if (!token) {
    const newToken = crypto.randomBytes(32).toString("hex");
    res.cookie("csrf_token", newToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
  }
  next();
}

export function requireCsrf(req, res, next) {
  const method = req.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) return next();

  const cookieToken = req.cookies?.csrf_token;
  const headerToken = req.header("x-csrf-token");

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: "CSRF validation failed" });
  }
  next();
}

