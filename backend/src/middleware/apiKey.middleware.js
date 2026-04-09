import { prisma } from "../prisma/client.js";
import { sha256 } from "../services/crypto.service.js";

export async function requireManufacturerApiKey(req, res, next) {
  const apiKey = req.header("X-API-Key");
  if (!apiKey) return res.status(401).json({ error: "Missing API key" });

  const apiKeyHash = sha256(apiKey);
  const manufacturer = await prisma.manufacturer.findFirst({
    where: { api_key_hash: apiKeyHash, is_approved: true },
    select: { id: true, user_id: true, subscription_plan: true, tags_remaining: true },
  });

  if (!manufacturer) return res.status(401).json({ error: "Invalid API key" });

  req.manufacturer = manufacturer;
  next();
}

