import crypto from "crypto";

function normalizePem(pem) {
  if (!pem) return "";
  return pem.replace(/\\n/g, "\n");
}

export function signPayload(payload, privateKeyPem) {
  const sign = crypto.createSign("SHA256");
  sign.update(payload);
  sign.end();
  return sign.sign(normalizePem(privateKeyPem), "base64");
}

export function verifyPayloadSignature(payload, signatureB64, publicKeyPem) {
  try {
    const verify = crypto.createVerify("SHA256");
    verify.update(payload);
    verify.end();
    return verify.verify(normalizePem(publicKeyPem), signatureB64, "base64");
  } catch {
    return false;
  }
}

export function generateRandomTagUid() {
  // 16 bytes -> 32 hex chars; safe for NFC UID surrogate when generating in-system
  return crypto.randomBytes(16).toString("hex");
}

export function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function hashToBase64(input) {
  return crypto.createHash("sha256").update(input).digest("base64");
}

