import bcrypt from "bcrypt";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "../prisma/client.js";
import { sha256 } from "../services/crypto.service.js";
import {
  getAuthCookieOptions,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";
import {
  buildOtpEmail,
  buildResetPasswordEmail,
  sendEmail,
} from "../services/email.service.js";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

const registerSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  password: passwordSchema,
  company_name: z.string().min(2),
  country: z.string().min(2),
});

const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

const forgotSchema = z.object({ email: z.string().email() });

const resetSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});

function makeOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function issueSessionCookies({ res, user, ip, userAgent }) {
  const session = await prisma.userSession.create({
    data: {
      user_id: user.id,
      refresh_token_hash: "PENDING",
      ip,
      user_agent: userAgent,
    },
    select: { id: true },
  });

  const refreshToken = signRefreshToken({
    sessionId: session.id,
    userId: user.id,
    role: user.role,
  });
  const refreshHash = sha256(refreshToken);

  await prisma.userSession.update({
    where: { id: session.id },
    data: { refresh_token_hash: refreshHash },
  });

  const accessToken = signAccessToken({ userId: user.id, role: user.role });

  const cookieOpts = getAuthCookieOptions();
  const refreshOpts = {
    ...cookieOpts,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  const accessOpts = {
    ...cookieOpts,
    maxAge: 15 * 60 * 1000,
  };

  res.cookie("access_token", accessToken, accessOpts);
  res.cookie("refresh_token", refreshToken, refreshOpts);

  return { sessionId: session.id };
}

export async function register(req, res) {
  const input = registerSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      password: passwordHash,
      full_name: input.full_name,
      role: "MANUFACTURER",
      manufacturer: {
        create: {
          company_name: input.company_name,
          country: input.country,
          subscription_plan: "FREE",
          tags_remaining: 0,
        },
      },
    },
    select: { id: true, email: true, full_name: true },
  });

  const otp = makeOtp();
  const otpHash = sha256(otp);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.emailVerificationOtp.create({
    data: { user_id: user.id, otp_hash: otpHash, expires_at: expiresAt },
  });

  const email = buildOtpEmail({ fullName: user.full_name, otp });
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    await sendEmail({ to: user.email, subject: email.subject, html: email.html, text: email.text });
  }

  res.status(201).json({ message: "Check your email for verification code" });
}

export async function resendOtp(req, res) {
  const input = z.object({ email: z.string().email() }).parse(req.body);
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
    select: { id: true, email: true, full_name: true, is_verified: true },
  });
  if (!user) return res.status(200).json({ message: "If the email exists, OTP was sent" });
  if (user.is_verified) return res.status(400).json({ error: "Email already verified" });

  const otp = makeOtp();
  await prisma.emailVerificationOtp.create({
    data: {
      user_id: user.id,
      otp_hash: sha256(otp),
      expires_at: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const email = buildOtpEmail({ fullName: user.full_name, otp });
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    await sendEmail({ to: user.email, subject: email.subject, html: email.html, text: email.text });
  }
  res.json({ message: "OTP sent" });
}

export async function verifyEmail(req, res) {
  const input = verifyEmailSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
    select: { id: true, is_verified: true },
  });
  if (!user) return res.status(400).json({ error: "Invalid code" });
  if (user.is_verified) return res.json({ message: "Already verified" });

  const otpHash = sha256(input.otp);
  const match = await prisma.emailVerificationOtp.findFirst({
    where: { user_id: user.id, otp_hash: otpHash, expires_at: { gt: new Date() } },
    select: { id: true },
  });
  if (!match) return res.status(400).json({ error: "Invalid or expired code" });

  await prisma.user.update({
    where: { id: user.id },
    data: { is_verified: true },
  });

  res.json({ message: "Email verified" });
}

export async function login(req, res) {
  const input = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
    include: { manufacturer: { select: { is_approved: true, is_active: true, id: true } } },
  });

  if (!user || !user.is_active) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  if (!user.is_verified) return res.status(403).json({ error: "Email not verified" });

  if (user.role === "MANUFACTURER" && user.manufacturer && !user.manufacturer.is_approved) {
    return res.status(403).json({ error: "Manufacturer not approved yet" });
  }

  await issueSessionCookies({
    res,
    user,
    ip: req.ip,
    userAgent: req.get("user-agent") || undefined,
  });

  res.json({
    user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
  });
}

export async function refresh(req, res) {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: "Unauthenticated" });

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  const refreshHash = sha256(refreshToken);
  const session = await prisma.userSession.findUnique({
    where: { refresh_token_hash: refreshHash },
    include: { user: true },
  });
  if (!session || session.revoked_at) return res.status(401).json({ error: "Unauthenticated" });
  if (session.id !== payload.sid) return res.status(401).json({ error: "Unauthenticated" });

  // Rotate refresh token
  await prisma.userSession.update({
    where: { id: session.id },
    data: { refresh_token_hash: "ROTATING" },
  });

  const newRefreshToken = signRefreshToken({
    sessionId: session.id,
    userId: session.user_id,
    role: session.user.role,
  });
  const newRefreshHash = sha256(newRefreshToken);
  await prisma.userSession.update({
    where: { id: session.id },
    data: { refresh_token_hash: newRefreshHash },
  });

  const newAccessToken = signAccessToken({ userId: session.user_id, role: session.user.role });
  const cookieOpts = getAuthCookieOptions();
  res.cookie("access_token", newAccessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 });
  res.cookie("refresh_token", newRefreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.json({ ok: true });
}

export async function logout(req, res) {
  const refreshToken = req.cookies?.refresh_token;
  if (refreshToken) {
    const refreshHash = sha256(refreshToken);
    await prisma.userSession.updateMany({
      where: { refresh_token_hash: refreshHash },
      data: { revoked_at: new Date() },
    });
  }

  res.clearCookie("access_token", getAuthCookieOptions());
  res.clearCookie("refresh_token", getAuthCookieOptions());
  res.json({ ok: true });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, full_name: true, role: true, is_verified: true },
  });
  res.json({ user });
}

export async function forgotPassword(req, res) {
  const input = forgotSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
    select: { id: true, email: true, full_name: true, is_active: true },
  });

  // Always return OK to prevent enumeration
  if (!user || !user.is_active) return res.json({ message: "If the email exists, a reset link was sent" });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(rawToken);

  await prisma.passwordResetToken.create({
    data: {
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
  const email = buildResetPasswordEmail({ fullName: user.full_name, resetUrl });
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    await sendEmail({ to: user.email, subject: email.subject, html: email.html, text: email.text });
  }

  res.json({ message: "If the email exists, a reset link was sent" });
}

export async function resetPassword(req, res) {
  const input = resetSchema.parse({ ...req.body, token: req.params.token });
  const tokenHash = sha256(input.token);

  const record = await prisma.passwordResetToken.findUnique({
    where: { token_hash: tokenHash },
  });
  if (!record || record.used_at || record.expires_at <= new Date()) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const newHash = await bcrypt.hash(input.password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.user_id }, data: { password: newHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { used_at: new Date() } }),
    prisma.userSession.updateMany({ where: { user_id: record.user_id }, data: { revoked_at: new Date() } }),
  ]);

  res.clearCookie("access_token", getAuthCookieOptions());
  res.clearCookie("refresh_token", getAuthCookieOptions());
  res.json({ message: "Password updated" });
}

export async function listSessions(req, res) {
  const sessions = await prisma.userSession.findMany({
    where: { user_id: req.user.id },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      created_at: true,
      revoked_at: true,
      ip: true,
      user_agent: true,
    },
  });
  res.json({ sessions });
}

export async function revokeOtherSessions(req, res) {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: "Unauthenticated" });
  const refreshHash = sha256(refreshToken);
  const current = await prisma.userSession.findUnique({
    where: { refresh_token_hash: refreshHash },
    select: { id: true, user_id: true },
  });
  if (!current || current.user_id !== req.user.id) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  await prisma.userSession.updateMany({
    where: { user_id: req.user.id, id: { not: current.id }, revoked_at: null },
    data: { revoked_at: new Date() },
  });
  res.json({ ok: true });
}

