import { randomInt, randomUUID } from "crypto";
import { prisma } from "@/lib/db";

// ─────────────────────────────────────────────
// Token Configuration
// ─────────────────────────────────────────────

const VERIFICATION_CODE_EXPIRY_MINUTES = 10;
const RESET_TOKEN_EXPIRY_MINUTES = 60;

// ─────────────────────────────────────────────
// Generate Tokens
// ─────────────────────────────────────────────

/**
 * Generate a 6-digit numeric verification code
 */
export function generateVerificationCode(): string {
  return randomInt(100000, 999999).toString();
}

/**
 * Generate a UUID-based password reset token
 */
export function generateResetToken(): string {
  return randomUUID();
}

// ─────────────────────────────────────────────
// Create & Store Tokens
// ─────────────────────────────────────────────

/**
 * Create an email verification code, deleting any existing ones for this email
 */
export async function createVerificationToken(email: string): Promise<string> {
  // Delete any existing verification tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      email,
      type: "EMAIL_VERIFICATION",
    },
  });

  const code = generateVerificationCode();

  await prisma.verificationToken.create({
    data: {
      email,
      token: code,
      type: "EMAIL_VERIFICATION",
      expiresAt: new Date(
        Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000
      ),
    },
  });

  return code;
}

/**
 * Create a password reset token, deleting any existing ones for this email
 */
export async function createResetToken(email: string): Promise<string> {
  // Delete any existing reset tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      email,
      type: "PASSWORD_RESET",
    },
  });

  const token = generateResetToken();

  await prisma.verificationToken.create({
    data: {
      email,
      token,
      type: "PASSWORD_RESET",
      expiresAt: new Date(
        Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000
      ),
    },
  });

  return token;
}

// ─────────────────────────────────────────────
// Verify Tokens
// ─────────────────────────────────────────────

/**
 * Verify an email verification code. Returns the email if valid, null otherwise.
 * Deletes the token after successful verification.
 */
export async function verifyVerificationCode(
  email: string,
  code: string
): Promise<boolean> {
  const token = await prisma.verificationToken.findFirst({
    where: {
      email,
      token: code,
      type: "EMAIL_VERIFICATION",
      expiresAt: { gt: new Date() },
    },
  });

  if (!token) return false;

  // Delete the token (one-time use)
  await prisma.verificationToken.delete({ where: { id: token.id } });

  // Mark user as verified
  await prisma.user.updateMany({
    where: { email },
    data: { emailVerified: new Date() },
  });

  return true;
}

/**
 * Verify a password reset token. Returns the email if valid, null otherwise.
 * Does NOT delete the token — caller should delete after password update.
 */
export async function verifyResetToken(
  token: string
): Promise<string | null> {
  const record = await prisma.verificationToken.findFirst({
    where: {
      token,
      type: "PASSWORD_RESET",
      expiresAt: { gt: new Date() },
    },
  });

  return record?.email ?? null;
}

/**
 * Delete a reset token after successful password change
 */
export async function deleteResetToken(token: string): Promise<void> {
  await prisma.verificationToken.deleteMany({
    where: { token, type: "PASSWORD_RESET" },
  });
}

/**
 * Check rate limit — returns true if the last token was created less than 60s ago
 */
export async function isRateLimited(
  email: string,
  type: "EMAIL_VERIFICATION" | "PASSWORD_RESET"
): Promise<boolean> {
  const recent = await prisma.verificationToken.findFirst({
    where: {
      email,
      type,
      createdAt: { gt: new Date(Date.now() - 60 * 1000) },
    },
  });

  return !!recent;
}
