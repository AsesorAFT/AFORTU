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

const legacyPublicRedirects = [
  { path: "/about", destination: "/modelo-afortu" },
  { path: "/services", destination: "/#soluciones" },
  { path: "/consultoria", destination: "/#soluciones" },
];

const disabledApiPaths = [
  "/api/chart",
  "/api/metrics",
  "/api/paypal/setup-billing",
  "/api/stock-price",
  "/api/transactions",
];

export function proxy(request: NextRequest) {
  const legacyRedirect = legacyPublicRedirects.find(
    ({ path }) =>
      request.nextUrl.pathname === path ||
      request.nextUrl.pathname.startsWith(`${path}/`),
  );

  if (legacyRedirect) {
    return NextResponse.redirect(
      new URL(legacyRedirect.destination, request.url),
      308,
    );
  }

  if (disabledApiPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.json(
      { error: "Not found" },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      },
    );
  }

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
    "/api/chart",
    "/api/metrics",
    "/api/paypal/setup-billing",
    "/api/stock-price",
    "/api/transactions",
    "/analysis/:path*",
    "/asset-management/:path*",
    "/billing/:path*",
    "/calendar/:path*",
    "/cav/:path*",
    "/consultoria/:path*",
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
