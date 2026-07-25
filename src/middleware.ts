import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
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
    "/profile/:path*",
    "/pro/:path*",
    "/services/:path*",
    "/settings/:path*",
    "/signup/:path*",
    "/tools/:path*",
  ],
};
