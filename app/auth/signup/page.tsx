import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your DoctorSewa account — patient or doctor.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
              <span className="text-base font-bold text-white">DS</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join DoctorSewa as a patient or doctor
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
