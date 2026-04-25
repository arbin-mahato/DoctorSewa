import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── Clean existing data ────────────────────────────
  await prisma.verificationToken.deleteMany();
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.doctorProfile.deleteMany();
  await prisma.patientProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.specialty.deleteMany();

  console.log("  ✓ Cleaned existing data");

  // ── Create Specialties ─────────────────────────────
  const specialties = await Promise.all([
    prisma.specialty.create({
      data: { name: "Cardiology", description: "Heart and cardiovascular system", icon: "❤️" },
    }),
    prisma.specialty.create({
      data: { name: "Dermatology", description: "Skin, hair, and nail conditions", icon: "🧴" },
    }),
    prisma.specialty.create({
      data: { name: "General Practice", description: "Primary care and general health", icon: "🩺" },
    }),
    prisma.specialty.create({
      data: { name: "Neurology", description: "Brain and nervous system disorders", icon: "🧠" },
    }),
    prisma.specialty.create({
      data: { name: "Orthopedics", description: "Bones, joints, and muscles", icon: "🦴" },
    }),
    prisma.specialty.create({
      data: { name: "Pediatrics", description: "Children and adolescent health", icon: "👶" },
    }),
    prisma.specialty.create({
      data: { name: "Psychiatry", description: "Mental health and behavioral disorders", icon: "🧘" },
    }),
    prisma.specialty.create({
      data: { name: "ENT", description: "Ear, nose, and throat conditions", icon: "👂" },
    }),
  ]);

  console.log(`  ✓ Created ${specialties.length} specialties`);

  // ── Hash password (shared for all seed users) ──────
  const hashedPassword = await bcrypt.hash("Password123!", 12);

  // ── Create Admin User ──────────────────────────────
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@doctorsewa.com",
      password: hashedPassword,
      role: "ADMIN",
      phone: "+977-9800000000",
      emailVerified: new Date(),
    },
  });

  console.log(`  ✓ Created admin: ${admin.email}`);

  // ── Create Patients ────────────────────────────────
  const patients = await Promise.all([
    prisma.user.create({
      data: {
        name: "Arbin Kumar",
        email: "arbin@example.com",
        password: hashedPassword,
        role: "PATIENT",
        phone: "+977-9801234567",
        emailVerified: new Date(),
        patientProfile: {
          create: {
            dateOfBirth: new Date("1995-06-15"),
            gender: "Male",
            medicalHistory: "No significant history",
            allergies: "None known",
            emergencyContact: "+977-9811111111",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Sita Sharma",
        email: "sita@example.com",
        password: hashedPassword,
        role: "PATIENT",
        phone: "+977-9802345678",
        emailVerified: new Date(),
        patientProfile: {
          create: {
            dateOfBirth: new Date("1990-03-22"),
            gender: "Female",
            allergies: "Penicillin",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Ram Thapa",
        email: "ram@example.com",
        password: hashedPassword,
        role: "PATIENT",
        phone: "+977-9803456789",
        emailVerified: new Date(),
        patientProfile: {
          create: {
            dateOfBirth: new Date("1988-11-05"),
            gender: "Male",
            medicalHistory: "Diabetes Type 2",
          },
        },
      },
    }),
  ]);

  console.log(`  ✓ Created ${patients.length} patients`);

  // ── Create Doctors ─────────────────────────────────
  const doctorData = [
    {
      name: "Dr. Rajesh Kumar",
      email: "rajesh@doctorsewa.com",
      phone: "+977-9811000001",
      specialtyIndex: 0, // Cardiology
      licenseNumber: "NMC-12345",
      experience: 12,
      qualifications: "MBBS, MD (Cardiology), FACC",
      hospital: "Grande International Hospital",
      consultationFee: 150000, // ₹1,500
      bio: "Senior cardiologist with 12+ years of experience in interventional cardiology.",
      rating: 4.8,
      totalReviews: 156,
    },
    {
      name: "Dr. Priya Patel",
      email: "priya@doctorsewa.com",
      phone: "+977-9811000002",
      specialtyIndex: 1, // Dermatology
      licenseNumber: "NMC-23456",
      experience: 8,
      qualifications: "MBBS, MD (Dermatology)",
      hospital: "Bir Hospital",
      consultationFee: 100000, // ₹1,000
      bio: "Dermatologist specializing in acne, eczema, and cosmetic dermatology.",
      rating: 4.6,
      totalReviews: 89,
    },
    {
      name: "Dr. Anil Shrestha",
      email: "anil@doctorsewa.com",
      phone: "+977-9811000003",
      specialtyIndex: 2, // General Practice
      licenseNumber: "NMC-34567",
      experience: 15,
      qualifications: "MBBS, MD (General Medicine)",
      clinic: "Shrestha Family Clinic",
      consultationFee: 50000, // ₹500
      bio: "Family physician with a focus on preventive care and chronic disease management.",
      rating: 4.9,
      totalReviews: 234,
    },
    {
      name: "Dr. Meena Joshi",
      email: "meena@doctorsewa.com",
      phone: "+977-9811000004",
      specialtyIndex: 5, // Pediatrics
      licenseNumber: "NMC-45678",
      experience: 10,
      qualifications: "MBBS, MD (Pediatrics), DCH",
      hospital: "Kanti Children's Hospital",
      consultationFee: 80000, // ₹800
      bio: "Pediatrician specializing in neonatal care and childhood immunizations.",
      rating: 4.7,
      totalReviews: 112,
    },
    {
      name: "Dr. Sanjay Gupta",
      email: "sanjay@doctorsewa.com",
      phone: "+977-9811000005",
      specialtyIndex: 3, // Neurology
      licenseNumber: "NMC-56789",
      experience: 20,
      qualifications: "MBBS, DM (Neurology), FRCP",
      hospital: "TU Teaching Hospital",
      consultationFee: 200000, // ₹2,000
      bio: "Neurologist with expertise in stroke management and epilepsy treatment.",
      rating: 4.5,
      totalReviews: 67,
    },
  ];

  const doctors = [];
  for (const doc of doctorData) {
    const user = await prisma.user.create({
      data: {
        name: doc.name,
        email: doc.email,
        password: hashedPassword,
        role: "DOCTOR",
        phone: doc.phone,
        emailVerified: new Date(),
        doctorProfile: {
          create: {
            licenseNumber: doc.licenseNumber,
            specialtyId: specialties[doc.specialtyIndex].id,
            experience: doc.experience,
            qualifications: doc.qualifications,
            hospital: doc.hospital || null,
            clinic: (doc as Record<string, unknown>).clinic as string || null,
            bio: doc.bio,
            consultationFee: doc.consultationFee,
            rating: doc.rating,
            totalReviews: doc.totalReviews,
            isVerified: true,
            verificationDate: new Date(),
          },
        },
      },
      include: { doctorProfile: true },
    });
    doctors.push(user);
  }

  console.log(`  ✓ Created ${doctors.length} doctors`);

  // ── Create Availability ────────────────────────────
  for (const doctor of doctors) {
    if (!doctor.doctorProfile) continue;

    // Monday through Friday, 9 AM to 5 PM
    for (let day = 1; day <= 5; day++) {
      await prisma.availability.create({
        data: {
          doctorId: doctor.doctorProfile.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          slotDuration: 30,
        },
      });
    }

    // Saturday, 10 AM to 2 PM
    await prisma.availability.create({
      data: {
        doctorId: doctor.doctorProfile.id,
        dayOfWeek: 6,
        startTime: "10:00",
        endTime: "14:00",
        slotDuration: 30,
      },
    });
  }

  console.log("  ✓ Created availability schedules (Mon-Sat)");

  // ── Create Appointments ────────────────────────────
  const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "COMPLETED"] as const;
  const reasons = [
    "Regular checkup and blood pressure monitoring",
    "Persistent headaches for 2 weeks",
    "Skin rash on arms and legs",
    "Child fever (102°F) for 3 days",
    "Follow-up consultation after surgery",
    "Chest pain during exercise",
    "Annual health screening",
    "Difficulty sleeping and anxiety",
    "Joint pain in knees",
    "Recurring stomach issues",
  ];

  const appointments = [];
  for (let i = 0; i < 10; i++) {
    const patient = patients[i % patients.length];
    const doctor = doctors[i % doctors.length];
    const daysOffset = i * 3 - 15; // spread across past and future
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    date.setHours(9 + (i % 8), 0, 0, 0);

    const startHour = 9 + (i % 8);
    const startTime = `${startHour.toString().padStart(2, "0")}:00`;
    const endTime = `${startHour.toString().padStart(2, "0")}:30`;

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.doctorProfile!.id,
        appointmentDate: date,
        startTime,
        endTime,
        reason: reasons[i],
        status: statuses[i % statuses.length],
      },
    });
    appointments.push(appointment);
  }

  console.log(`  ✓ Created ${appointments.length} appointments`);

  // ── Create Reviews ─────────────────────────────────
  const reviewComments = [
    "Excellent doctor! Very thorough and patient. Explained everything clearly.",
    "Very knowledgeable and professional. Highly recommend.",
    "Great experience. Short wait time and excellent care.",
    "Dr. was very attentive and addressed all my concerns.",
    "Best doctor I've visited. Will definitely come back.",
  ];

  for (let i = 0; i < 5; i++) {
    const patient = patients[i % patients.length];
    const doctor = doctors[i % doctors.length];

    await prisma.review.create({
      data: {
        doctorId: doctor.doctorProfile!.id,
        patientId: patient.id,
        rating: 4 + (i % 2), // 4 or 5
        comment: reviewComments[i],
      },
    });
  }

  console.log("  ✓ Created 5 reviews");

  // ── Create Notifications ───────────────────────────
  for (const patient of patients) {
    await prisma.notification.create({
      data: {
        userId: patient.id,
        title: "Welcome to DoctorSewa!",
        message: "Your account has been created. Start by finding a doctor.",
        type: "APPOINTMENT_CONFIRMED",
        isRead: false,
      },
    });
  }

  console.log("  ✓ Created welcome notifications");

  // ── Summary ────────────────────────────────────────
  console.log("\n🎉 Seeding complete!\n");
  console.log("  📧 Login credentials (all users):");
  console.log("     Password: Password123!\n");
  console.log("  👤 Admin:    admin@doctorsewa.com");
  console.log("  👤 Patient:  arbin@example.com");
  console.log("  👤 Patient:  sita@example.com");
  console.log("  👤 Patient:  ram@example.com");
  console.log("  🩺 Doctor:   rajesh@doctorsewa.com");
  console.log("  🩺 Doctor:   priya@doctorsewa.com");
  console.log("  🩺 Doctor:   anil@doctorsewa.com");
  console.log("  🩺 Doctor:   meena@doctorsewa.com");
  console.log("  🩺 Doctor:   sanjay@doctorsewa.com\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
