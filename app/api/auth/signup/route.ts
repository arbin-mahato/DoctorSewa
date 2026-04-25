import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Zod Validation ──────────────────────────────────
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, phone, password, role } = parsed.data;

    // ── Check if user already exists ────────────────────
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // ── Hash password & create user ─────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role,
      },
    });

    // Create associated profile based on role
    if (role === "PATIENT") {
      await prisma.patientProfile.create({
        data: { userId: user.id },
      });
    }
    // Note: DoctorProfile requires licenseNumber, specialtyId, experience,
    // and consultationFee — these will be collected in a separate onboarding step

    // ── Send verification email ─────────────────────────
    const code = await createVerificationToken(email);
    await sendVerificationEmail(email, code);

    return NextResponse.json(
      {
        message: "Account created successfully. Please verify your email.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
