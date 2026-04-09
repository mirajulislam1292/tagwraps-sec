import nodemailer from "nodemailer";

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

export async function sendEmail({ to, subject, html, text }) {
  const transporter = getTransport();
  await transporter.sendMail({
    from: `"TagWraps Sec" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

export function buildOtpEmail({ fullName, otp }) {
  const safeName = fullName || "there";
  return {
    subject: "Verify your TagWraps Sec account",
    text: `Hi ${safeName},\n\nYour verification code is: ${otp}\n\nThis code expires in 15 minutes.\n\n— TagWraps Sec`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>TagWraps Sec — Email Verification</h2>
        <p>Hi ${safeName},</p>
        <p>Your verification code is:</p>
        <div style="font-size:28px;font-weight:700;letter-spacing:6px;padding:12px 16px;background:#F3F4F6;border-radius:10px;display:inline-block">${otp}</div>
        <p style="margin-top:16px;color:#6B7280">This code expires in 15 minutes.</p>
      </div>
    `,
  };
}

export function buildResetPasswordEmail({ fullName, resetUrl }) {
  const safeName = fullName || "there";
  return {
    subject: "Reset your TagWraps Sec password",
    text: `Hi ${safeName},\n\nReset your password using this link (expires in 1 hour):\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.\n\n— TagWraps Sec`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Reset your password</h2>
        <p>Hi ${safeName},</p>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <p><a href="${resetUrl}" style="background:#0047AB;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none;display:inline-block">Reset password</a></p>
        <p style="color:#6B7280">If you didn't request this, ignore this email.</p>
      </div>
    `,
  };
}

