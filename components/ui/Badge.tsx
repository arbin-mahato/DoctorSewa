import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  outline: "border border-gray-300 bg-transparent text-gray-700",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────
// Pre-configured appointment status badges
// ─────────────────────────────────────────────

const statusVariantMap: Record<string, BadgeVariant> = {
  PENDING: "warning",
  CONFIRMED: "success",
  COMPLETED: "info",
  CANCELLED: "danger",
  NO_SHOW: "default",
};

export function StatusBadge({ status }: { status: string }) {
  const variant = statusVariantMap[status] ?? "default";
  return <Badge variant={variant}>{status}</Badge>;
}
