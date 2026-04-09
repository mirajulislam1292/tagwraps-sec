import jwt from "jsonwebtoken";

export function signAccessToken({ userId, role }) {
  return jwt.sign({ sub: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function signRefreshToken({ sessionId, userId, role }) {
  return jwt.sign({ sid: sessionId, sub: userId, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export function getAuthCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  };
}

