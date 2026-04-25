import { z } from "zod/v4";

// ─────────────────────────────────────────────
// AUTH SCHEMAS
// ─────────────────────────────────────────────

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long")
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
  role: z.enum(["PATIENT", "DOCTOR"], {
    error: "Role must be PATIENT or DOCTOR",
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase().trim()),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase().trim()),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase().trim()),
  code: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Code must contain only digits"),
});

// ─────────────────────────────────────────────
// PROFILE SCHEMAS
// ─────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer")
    .trim()
    .optional(),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  bio: z.string().max(500, "Bio must be 500 characters or fewer").optional(),
  profileImage: z.string().url("Invalid image URL").optional(),
});

export const doctorProfileSchema = z.object({
  licenseNumber: z
    .string()
    .min(1, "License number is required")
    .max(50, "License number is too long"),
  specialtyId: z.string().min(1, "Specialty is required"),
  experience: z
    .number()
    .int()
    .min(0, "Experience must be 0 or more years")
    .max(60, "Experience seems too high"),
  qualifications: z
    .string()
    .max(500, "Qualifications are too long")
    .optional(),
  hospital: z.string().max(200, "Hospital name is too long").optional(),
  clinic: z.string().max(200, "Clinic name is too long").optional(),
  bio: z.string().max(1000, "Bio must be 1000 characters or fewer").optional(),
  consultationFee: z
    .number()
    .int()
    .min(100, "Fee must be at least ₹1 (100 paisa)")
    .max(10000000, "Fee seems too high"),
});

// ─────────────────────────────────────────────
// SCHEDULING SCHEMAS
// ─────────────────────────────────────────────

export const availabilitySchema = z.object({
  dayOfWeek: z
    .number()
    .int()
    .min(0, "Day must be 0 (Sunday) to 6 (Saturday)")
    .max(6),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Start time must be HH:mm format"),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "End time must be HH:mm format"),
  slotDuration: z
    .number()
    .int()
    .min(10, "Slot must be at least 10 minutes")
    .max(120, "Slot must be at most 120 minutes")
    .default(30),
});

// ─────────────────────────────────────────────
// APPOINTMENT SCHEMAS
// ─────────────────────────────────────────────

export const createAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor is required"),
  appointmentDate: z.string().date("Invalid date format"),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be HH:mm format"),
  reason: z
    .string()
    .min(10, "Please describe your reason (at least 10 characters)")
    .max(500, "Reason is too long"),
});

// ─────────────────────────────────────────────
// REVIEW SCHEMAS
// ─────────────────────────────────────────────

export const reviewSchema = z.object({
  doctorId: z.string().min(1, "Doctor is required"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be 1–5")
    .max(5, "Rating must be 1–5"),
  comment: z.string().max(1000, "Comment is too long").optional(),
});

// ─────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type DoctorProfileInput = z.infer<typeof doctorProfileSchema>;
export type AvailabilityInput = z.infer<typeof availabilitySchema>;
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
