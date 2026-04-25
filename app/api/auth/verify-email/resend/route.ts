import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations";
import { createVerificationToken, isRateLimited } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

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
    const rateLimited = await isRateLimited(email, "EMAIL_VERIFICATION");
    if (rateLimited) {
      return NextResponse.json(
        { error: "Please wait 60 seconds before requesting another code" },
        { status: 429 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    // Already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 }
      );
    }

    // Generate new code and send email
    const code = await createVerificationToken(email);
    await sendVerificationEmail(email, code);

    return NextResponse.json(
      { message: "Verification code sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[RESEND_VERIFY_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
