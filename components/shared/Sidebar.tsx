"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: string; // emoji for now, lucide-react icons later
}

const patientLinks: SidebarItem[] = [
  { label: "Dashboard", href: "/patient", icon: "📊" },
  { label: "Appointments", href: "/patient/appointments", icon: "📅" },
  { label: "Chat", href: "/patient/chat", icon: "💬" },
  { label: "Prescriptions", href: "/patient/prescriptions", icon: "💊" },
  { label: "Payments", href: "/patient/payments", icon: "💳" },
  { label: "Symptom Checker", href: "/patient/symptom-checker", icon: "🤖" },
  { label: "Notifications", href: "/patient/notifications", icon: "🔔" },
  { label: "Profile", href: "/patient/profile", icon: "👤" },
  { label: "Settings", href: "/patient/settings", icon: "⚙️" },
];

const doctorLinks: SidebarItem[] = [
  { label: "Dashboard", href: "/doctor", icon: "📊" },
  { label: "Appointments", href: "/doctor/appointments", icon: "📅" },
  { label: "Schedule", href: "/doctor/schedule", icon: "🕐" },
  { label: "Chat", href: "/doctor/chat", icon: "💬" },
  { label: "Prescriptions", href: "/doctor/prescriptions", icon: "📋" },
  { label: "Patients", href: "/doctor/patients", icon: "👥" },
  { label: "Earnings", href: "/doctor/earnings", icon: "💰" },
  { label: "Analytics", href: "/doctor/analytics", icon: "📈" },
  { label: "Reviews", href: "/doctor/reviews", icon: "⭐" },
  { label: "Profile", href: "/doctor/profile", icon: "👤" },
  { label: "Settings", href: "/doctor/settings", icon: "⚙️" },
];

const adminLinks: SidebarItem[] = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Doctors", href: "/admin/doctors", icon: "🩺" },
  { label: "Patients", href: "/admin/patients", icon: "👥" },
  { label: "Appointments", href: "/admin/appointments", icon: "📅" },
  { label: "Payments", href: "/admin/payments", icon: "💳" },
  { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

function getLinksByRole(pathname: string): SidebarItem[] {
  if (pathname.startsWith("/doctor")) return doctorLinks;
  if (pathname.startsWith("/admin")) return adminLinks;
  return patientLinks;
}

function getRoleLabel(pathname: string): string {
  if (pathname.startsWith("/doctor")) return "Doctor Portal";
  if (pathname.startsWith("/admin")) return "Admin Portal";
  return "Patient Portal";
}

export function Sidebar() {
  const pathname = usePathname();
  const links = getLinksByRole(pathname ?? "");
  const roleLabel = getRoleLabel(pathname ?? "");

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <span className="text-sm font-bold text-white">DS</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            Doctor<span className="text-emerald-600">Sewa</span>
          </span>
        </Link>
      </div>

      {/* Role Label */}
      <div className="px-6 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {roleLabel}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/patient" &&
              link.href !== "/doctor" &&
              link.href !== "/admin" &&
              pathname?.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
          <span className="text-base">🚪</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
