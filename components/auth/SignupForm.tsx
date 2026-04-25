"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { animations } from "@/lib/animations";

export function SignupForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shakeFields, setShakeFields] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT" as "PATIENT" | "DOCTOR",
  });

  // Fade in form on mount
  useEffect(() => {
    if (formRef.current) {
      animations.fadeIn(formRef.current);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setShakeFields(false);
  };

  const triggerShake = () => {
    setShakeFields(true);
    setTimeout(() => setShakeFields(false), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShakeFields(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      triggerShake();
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        triggerShake();
        return;
      }

      // Success animation then redirect to email verification
      if (formRef.current) {
        animations.success(formRef.current);
      }
      setTimeout(() => {
        router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);
      }, 600);
    } catch {
      setError("Network error. Please try again.");
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" style={{ opacity: 0 }}>
      {error && (
        <Alert variant="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Input
        label="Full Name"
        name="name"
        placeholder="Dr. Arbin Kumar"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="arbin@example.com"
        value={formData.email}
        onChange={handleChange}
        variant={error?.includes("email") ? "error" : "default"}
        shake={error?.includes("email") ? shakeFields : false}
        required
      />

      <Input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+91 9800000000"
        value={formData.phone}
        onChange={handleChange}
      />

      {/* Role Selector */}
      <div className="w-full">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          I am a
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, role: "PATIENT" }))}
            className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              formData.role === "PATIENT"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700 scale-[1.02]"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            👤 Patient
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, role: "DOCTOR" }))}
            className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              formData.role === "DOCTOR"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700 scale-[1.02]"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            🩺 Doctor
          </button>
        </div>
      </div>

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="At least 8 characters"
        value={formData.password}
        onChange={handleChange}
        variant={error?.includes("Password") ? "error" : "default"}
        shake={error?.includes("Password") ? shakeFields : false}
        showPasswordToggle
        required
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Repeat your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        variant={error?.includes("match") ? "error" : "default"}
        shake={error?.includes("match") ? shakeFields : false}
        showPasswordToggle
        required
      />

      <Button type="submit" className="w-full" size="lg" loading={isLoading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-emerald-600 hover:text-emerald-700"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
