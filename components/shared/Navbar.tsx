"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");

  // Don't show navbar on dashboard pages (they have sidebar)
  const isDashboard =
    pathname?.startsWith("/patient") ||
    pathname?.startsWith("/doctor") ||
    pathname?.startsWith("/admin");

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <span className="text-sm font-bold text-white">DS</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            Doctor<span className="text-emerald-600">Sewa</span>
          </span>
        </Link>

        {/* Navigation Links */}
        {!isAuthPage && (
          <div className="hidden items-center gap-8 md:flex">
            <NavLink href="/doctors" current={pathname}>
              Find Doctors
            </NavLink>
            <NavLink href="/specialties" current={pathname}>
              Specialties
            </NavLink>
            <NavLink href="/symptoms" current={pathname}>
              Symptom Checker
            </NavLink>
            <NavLink href="/about" current={pathname}>
              About
            </NavLink>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {!isAuthPage && (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: string | null;
  children: React.ReactNode;
}) {
  const isActive = current === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors",
        isActive
          ? "text-emerald-600"
          : "text-gray-600 hover:text-gray-900"
      )}
    >
      {children}
    </Link>
  );
}
