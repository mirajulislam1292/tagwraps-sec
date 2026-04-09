import { verifyAccessToken } from "../utils/tokenUtils.js";

export function requireAuth(req, res, next) {
  const token = req.cookies?.access_token;
  if (!token) return res.status(401).json({ error: "Unauthenticated" });

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthenticated" });
  }
}

export function requireRoles(roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthenticated" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "Forbidden" });
    return next();
  };
}

