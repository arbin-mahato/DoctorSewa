import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Routes that require no authentication
const publicRoutes = [
  "/",
  "/doctors",
  "/specialties",
  "/symptoms",
  "/hospitals",
  "/health-packages",
  "/blog",
  "/about",
  "/faq",
  "/contact",
  "/terms",
  "/privacy",
];

// Auth routes — redirect to dashboard if already logged in
const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
];

// Routes that require specific roles
const roleRoutes: Record<string, string[]> = {
  "/patient": ["PATIENT"],
  "/doctor": ["DOCTOR"],
  "/admin": ["ADMIN"],
};

function isPublicRoute(pathname: string): boolean {
  // Exact match or dynamic public routes
  if (publicRoutes.includes(pathname)) return true;

  // Dynamic public routes: /doctors/[id], /specialties/[slug], /blog/[slug], /hospitals/[id]
  if (pathname.startsWith("/doctors/") && pathname.split("/").length === 3) return true;
  if (pathname.startsWith("/specialties/") && pathname.split("/").length === 3) return true;
  if (pathname.startsWith("/blog/") && pathname.split("/").length === 3) return true;
  if (pathname.startsWith("/hospitals/") && pathname.split("/").length === 3) return true;

  return false;
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route));
}

function getRequiredRoles(pathname: string): string[] | null {
  for (const [prefix, roles] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(prefix)) {
      return roles;
    }
  }
  return null;
}

function getDashboardUrl(role: string): string {
  switch (role) {
    case "DOCTOR":
      return "/doctor";
    case "ADMIN":
      return "/admin";
    default:
      return "/patient";
  }
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // 1. Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Public routes — allow everyone
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 3. Auth routes — redirect logged-in users to their dashboard
  if (isAuthRoute(pathname)) {
    // Exception: verify-email should always be accessible
    if (pathname.startsWith("/auth/verify-email")) {
      return NextResponse.next();
    }

    if (session?.user) {
      const dashboardUrl = getDashboardUrl(session.user.role);
      return NextResponse.redirect(new URL(dashboardUrl, req.url));
    }
    return NextResponse.next();
  }

  // 4. Protected routes — require authentication
  if (!session?.user) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Role-based access control
  const requiredRoles = getRequiredRoles(pathname);
  if (requiredRoles && !requiredRoles.includes(session.user.role)) {
    // Redirect to correct dashboard
    const dashboardUrl = getDashboardUrl(session.user.role);
    return NextResponse.redirect(new URL(dashboardUrl, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
