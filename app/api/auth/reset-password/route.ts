import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validations";
import { verifyResetToken, deleteResetToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { token, password } = parsed.data;

    // Verify the reset token
    const email = await verifyResetToken(token);
    if (!email) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password
    await prisma.user.updateMany({
      where: { email },
      data: {
        password: hashedPassword,
        // Also verify email if not already verified (user proved email access)
        emailVerified: new Date(),
      },
    });

    // Delete the used token
    await deleteResetToken(token);

    return NextResponse.json(
      { message: "Password reset successfully. You can now log in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[RESET_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
