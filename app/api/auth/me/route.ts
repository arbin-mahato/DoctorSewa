import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = req.auth.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        profileImage: true,
        bio: true,
        emailVerified: true,
        createdAt: true,
        patientProfile: {
          select: {
            id: true,
            dateOfBirth: true,
            gender: true,
            medicalHistory: true,
            allergies: true,
            emergencyContact: true,
          },
        },
        doctorProfile: {
          select: {
            id: true,
            licenseNumber: true,
            specialtyId: true,
            specialty: {
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
            experience: true,
            qualifications: true,
            hospital: true,
            clinic: true,
            bio: true,
            rating: true,
            totalReviews: true,
            isVerified: true,
            verificationDate: true,
            consultationFee: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("[ME_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
