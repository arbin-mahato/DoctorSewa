import type { Metadata } from "next";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your DoctorSewa account email address.",
};

export default function VerifyEmailPage() {
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
            Verify your email
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <Suspense
            fallback={<div className="h-64 animate-pulse rounded bg-gray-100" />}
          >
            <VerifyEmailForm />
          </Suspense>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Wrong email?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Sign up again
          </Link>
        </p>
      </div>
    </div>
  );
}
