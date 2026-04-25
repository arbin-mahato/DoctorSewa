"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { animations } from "@/lib/animations";

export function ForgotPasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  // Fade in form on mount
  useEffect(() => {
    if (formRef.current) {
      animations.fadeIn(formRef.current);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            If an account exists for <strong>{email}</strong>, we&apos;ve sent a
            password reset link.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
      style={{ opacity: 0 }}
    >
      {error && (
        <Alert variant="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <p className="text-sm text-gray-600">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="arbin@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null);
        }}
        required
      />

      <Button type="submit" className="w-full" size="lg" loading={isLoading}>
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-gray-500">
        <Link
          href="/auth/login"
          className="font-medium text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Login
        </Link>
      </p>
    </form>
  );
}
