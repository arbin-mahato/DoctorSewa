import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations";
import { createResetToken, isRateLimited } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email } = parsed.data;

    // Rate limit — 1 per 60 seconds
    const rateLimited = await isRateLimited(email, "PASSWORD_RESET");
    if (rateLimited) {
      return NextResponse.json(
        { error: "Please wait 60 seconds before requesting another reset link" },
        { status: 429 }
      );
    }

    // Check if user exists — but always return success to prevent email enumeration
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = await createResetToken(email);
      await sendPasswordResetEmail(email, token);
    }

    // Always return success to prevent email enumeration
    return NextResponse.json(
      {
        message:
          "If an account with that email exists, we sent a password reset link.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
