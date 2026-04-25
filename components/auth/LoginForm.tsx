"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { animations } from "@/lib/animations";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shakeFields, setShakeFields] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Fade in form on mount
  useEffect(() => {
    if (formRef.current) {
      animations.fadeIn(formRef.current);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setShakeFields(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShakeFields(false);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Check for unverified email error
        if (result.error.includes("UNVERIFIED_EMAIL") || result.code === "UNVERIFIED_EMAIL") {
          router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);
          return;
        }
        setError("Invalid email or password");
        setShakeFields(true);
        setTimeout(() => setShakeFields(false), 400);
        return;
      }

      // Fetch session to get role for redirect
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (role === "DOCTOR") {
        router.push("/doctor");
      } else if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/patient");
      }

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setShakeFields(true);
      setTimeout(() => setShakeFields(false), 400);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" style={{ opacity: 0 }}>
      {registered && (
        <Alert variant="success">
          Account created successfully! Please verify your email and log in.
        </Alert>
      )}

      {verified && (
        <Alert variant="success">
          Email verified successfully! You can now log in.
        </Alert>
      )}

      {reset && (
        <Alert variant="success">
          Password reset successfully! Log in with your new password.
        </Alert>
      )}

      {error && (
        <Alert variant="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="arbin@example.com"
        value={formData.email}
        onChange={handleChange}
        variant={error ? "error" : "default"}
        shake={shakeFields}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        variant={error ? "error" : "default"}
        shake={shakeFields}
        showPasswordToggle
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          Remember me
        </label>
        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" size="lg" loading={isLoading}>
        Log in
      </Button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-emerald-600 hover:text-emerald-700"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
