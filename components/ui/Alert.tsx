import React from "react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string }> = {
  info: {
    container: "border-blue-200 bg-blue-50 text-blue-800",
    icon: "ℹ️",
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: "✓",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-800",
    icon: "⚠",
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-800",
    icon: "✕",
  },
};

export function Alert({
  children,
  variant = "info",
  title,
  className,
  dismissible = false,
  onDismiss,
}: AlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-lg border px-4 py-3 text-sm",
        styles.container,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex-shrink-0 text-base" aria-hidden="true">
          {styles.icon}
        </span>
        <div className="flex-1">
          {title && (
            <p className="mb-1 font-semibold">{title}</p>
          )}
          <div>{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Dismiss alert"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
