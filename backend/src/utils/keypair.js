import crypto from "crypto";
import fs from "fs";
import path from "path";

function getEnvPath() {
  // Prefer backend/.env
  return path.resolve(process.cwd(), ".env");
}

function upsertEnvVar(contents, key, value) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(contents)) return contents.replace(re, line);
  const suffix = contents.endsWith("\n") || contents.length === 0 ? "" : "\n";
  return `${contents}${suffix}${line}\n`;
}

export function ensureEcdsaKeypairInEnv({ log = console } = {}) {
  const envPath = getEnvPath();
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";

  const hasPriv = /^ECDSA_PRIVATE_KEY=.+/m.test(existing);
  const hasPub = /^ECDSA_PUBLIC_KEY=.+/m.test(existing);

  if (hasPriv && hasPub) return;

  const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "prime256v1", // P-256
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  // Store as single-line env values (newline escaped) to keep dotenv happy.
  const privOneLine = privateKey.replace(/\n/g, "\\n");
  const pubOneLine = publicKey.replace(/\n/g, "\\n");

  let updated = existing;
  updated = upsertEnvVar(updated, "ECDSA_PRIVATE_KEY", privOneLine);
  updated = upsertEnvVar(updated, "ECDSA_PUBLIC_KEY", pubOneLine);

  fs.writeFileSync(envPath, updated, "utf8");

  log.info("[TagWraps Sec] ECDSA keypair generated and saved to backend .env");
  log.info(
    "[TagWraps Sec] Keep ECDSA_PRIVATE_KEY secret. You can rotate in /admin/system."
  );
}

