import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPortalPaths = [
  "/analysis",
  "/asset-management",
  "/billing",
  "/calendar",
  "/cav",
  "/contracts",
  "/coordination",
  "/dashboard",
  "/objectives",
  "/profile",
  "/pro",
  "/settings",
  "/signup",
  "/tools",
];

export function proxy(request: NextRequest) {
  const isProtectedPortalPath = protectedPortalPaths.some(
    (path) =>
      request.nextUrl.pathname === path ||
      request.nextUrl.pathname.startsWith(`${path}/`),
  );

  if (isProtectedPortalPath) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: [
    "/about/:path*",
    "/analysis/:path*",
    "/asset-management/:path*",
    "/billing/:path*",
    "/calendar/:path*",
    "/cav/:path*",
    "/contracts/:path*",
    "/coordination/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/objectives/:path*",
    "/privacy/:path*",
    "/profile/:path*",
    "/pro/:path*",
    "/services/:path*",
    "/settings/:path*",
    "/signup/:path*",
    "/terms/:path*",
    "/tools/:path*",
  ],
};
