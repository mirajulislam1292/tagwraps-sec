import { Router } from "express";
import { verifyTag, verifyTagGet } from "../controllers/verify.controller.js";
import { publicVerifyLimiter } from "../middleware/rateLimit.middleware.js";

export const verifyRouter = Router();

verifyRouter.post("/", publicVerifyLimiter, verifyTag);
verifyRouter.get("/:tag_uid", publicVerifyLimiter, verifyTagGet);

