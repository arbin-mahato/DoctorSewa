import { type ClassValue, clsx } from "clsx";

// ─────────────────────────────────────────────
// Classname utility (Tailwind merge helper)
// ─────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ─────────────────────────────────────────────
// Formatting utilities
// ─────────────────────────────────────────────

/**
 * Format amount from paisa to INR display string
 * e.g. 50000 → "₹500.00"
 */
export function formatCurrency(amountInPaisa: number): string {
  return `₹${(amountInPaisa / 100).toFixed(2)}`;
}

/**
 * Format a date to a readable string
 * e.g. "2026-04-03" → "Apr 3, 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format time string (HH:mm) to 12-hour format
 * e.g. "14:30" → "2:30 PM"
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// ─────────────────────────────────────────────
// Validation utilities
// ─────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[+]?[\d\s-]{10,15}$/.test(phone);
}

// ─────────────────────────────────────────────
// String utilities
// ─────────────────────────────────────────────

/**
 * Get initials from a name
 * e.g. "Arbin Kumar" → "AK"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ─────────────────────────────────────────────
// Status color mapping
// ─────────────────────────────────────────────

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    CONFIRMED: "bg-emerald-100 text-emerald-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
    NO_SHOW: "bg-gray-100 text-gray-800",
  };
  return colors[status] ?? "bg-gray-100 text-gray-800";
}
