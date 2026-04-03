import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { isValidEmail } from "@/lib/utils";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 20;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const phone = (body.phone ?? "").trim();
    const password = body.password ?? "";
    const role = body.role ?? "";

    // ── Validation ──────────────────────────────────────
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer` },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: "Email address is too long" },
        { status: 400 }
      );
    }

    if (phone && phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        { error: "Phone number is too long" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!["PATIENT", "DOCTOR"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be PATIENT or DOCTOR" },
        { status: 400 }
      );
    }

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

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
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
