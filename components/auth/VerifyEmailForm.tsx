"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { animations } from "@/lib/animations";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const formRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Fade in on mount
  useEffect(() => {
    if (formRef.current) {
      animations.fadeIn(formRef.current);
    }
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Auto-submit when all 6 digits are filled
  const handleVerify = useCallback(
    async (fullCode: string) => {
      if (fullCode.length !== 6 || !email) return;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: fullCode }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Verification failed");
          // Shake + clear inputs
          setCode(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
          return;
        }

        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login?verified=true");
        }, 1500);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [email, router]
  );

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(null);

    if (value && index < 5) {
      // Auto-focus next input
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    const fullCode = newCode.join("");
    if (fullCode.length === 6 && newCode.every((d) => d !== "")) {
      handleVerify(fullCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move to previous input on backspace when current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 0) return;

    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmpty = newCode.findIndex((d) => d === "");
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();

    // Auto-submit if all filled
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;

    setIsResending(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify-email/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to resend code");
        return;
      }

      setResendCooldown(60);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div ref={formRef} style={{ opacity: 0 }}>
      {success ? (
        <div className="flex flex-col items-center gap-4 py-8">
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
            Email verified!
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {error && (
            <Alert variant="error" dismissible onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}

          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
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
            <p className="text-sm text-gray-600">
              We sent a 6-digit code to
            </p>
            <p className="mt-1 font-medium text-gray-900">{email}</p>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                autoFocus={index === 0}
                className={`h-14 w-12 rounded-xl border-2 text-center text-xl font-semibold outline-none transition-all duration-200 ${
                  digit
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-white text-gray-900"
                } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:opacity-50`}
              />
            ))}
          </div>

          <Button
            onClick={() => handleVerify(code.join(""))}
            className="w-full"
            size="lg"
            loading={isLoading}
            disabled={code.some((d) => d === "")}
          >
            Verify Email
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn&apos;t receive the code?{" "}
              {resendCooldown > 0 ? (
                <span className="text-gray-400">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
