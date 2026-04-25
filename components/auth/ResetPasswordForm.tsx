"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { animations } from "@/lib/animations";

function getPasswordStrength(password: string): {
  level: "weak" | "medium" | "strong";
  label: string;
  color: string;
  width: string;
} {
  if (password.length === 0) {
    return { level: "weak", label: "", color: "", width: "0%" };
  }
  if (password.length < 8) {
    return {
      level: "weak",
      label: "Weak",
      color: "bg-red-500",
      width: "33%",
    };
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length >= 8 && hasUpper && hasNumber && hasSpecial) {
    return {
      level: "strong",
      label: "Strong",
      color: "bg-emerald-500",
      width: "100%",
    };
  }
  if (password.length >= 8 && (hasUpper || hasNumber)) {
    return {
      level: "medium",
      label: "Medium",
      color: "bg-amber-500",
      width: "66%",
    };
  }
  return {
    level: "weak",
    label: "Weak",
    color: "bg-red-500",
    width: "33%",
  };
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const strength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  // Fade in form on mount
  useEffect(() => {
    if (formRef.current) {
      animations.fadeIn(formRef.current);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid reset link. Please request a new one.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login?reset=true");
      }, 2000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-900">
          Password reset successfully!
        </p>
        <p className="text-sm text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <Alert variant="error">
        Invalid or missing reset token. Please request a new password reset
        link.
      </Alert>
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
        Enter your new password below.
      </p>

      <div>
        <Input
          label="New Password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={handleChange}
          showPasswordToggle
          required
        />
        {/* Password Strength Meter */}
        {formData.password && (
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: strength.width }}
              />
            </div>
            <p
              className={`mt-1 text-xs ${
                strength.level === "strong"
                  ? "text-emerald-600"
                  : strength.level === "medium"
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {strength.label}
            </p>
          </div>
        )}
      </div>

      <div>
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPasswordToggle
          required
        />
        {formData.confirmPassword && (
          <p
            className={`mt-1 text-xs ${
              passwordsMatch ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        loading={isLoading}
        disabled={!formData.password || !passwordsMatch}
      >
        Reset Password
      </Button>
    </form>
  );
}
