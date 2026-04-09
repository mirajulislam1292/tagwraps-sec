import { requireAuth, requireRoles } from "./auth.middleware.js";

export const requireAdmin = [requireAuth, requireRoles(["SUPER_ADMIN"])];

