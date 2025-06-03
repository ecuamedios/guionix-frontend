import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { UserRole } from "@/lib/auth";

// Role hierarchy for validation
const roleHierarchy: UserRole[] = [
  "SUPER_ADMIN",
  "DIRECTOR",
  "SUPERVISOR",
  "EDITOR",
  "VIEWER",
];

function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy.indexOf(userRole) <= roleHierarchy.indexOf(requiredRole);
}

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/landing", // Public landing page
  "/dev-dashboard", // Development only
  "/dev-login", // Development only
  "/simple-login", // Development only
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and NextAuth API
  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/health")
  ) {
    return NextResponse.next();
  }

  // Get session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Protect all routes except login/register - INCLUDING root path
  if (!token) {
    // If accessing root without session, redirect to landing page
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/landing", req.url));
    }
    // Otherwise redirect to login for protected routes
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protect /admin/*
  if (pathname.startsWith("/admin")) {
    if (!token || !["SUPER_ADMIN", "DIRECTOR"].includes(token.role)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /studio/*
  if (pathname.startsWith("/studio")) {
    if (!token || !hasRole(token.role, "EDITOR")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /api/* except /api/auth/* and development endpoints
  if (
    pathname.startsWith("/api") &&
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/api/test") &&
    !pathname.startsWith("/api/dev-auth") &&
    !pathname.startsWith("/api/health") &&
    !pathname.startsWith("/api/integration")
  ) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/projects/:path*", 
    "/admin/:path*",
    "/studio/:path*",
    "/api/:path*",
  ],
};