import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set a new password for your DoctorSewa account.",
};

export default function ResetPasswordPage() {
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
            Set new password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose a strong password for your account
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <Suspense
            fallback={<div className="h-64 animate-pulse rounded bg-gray-100" />}
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
