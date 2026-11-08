import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    url.searchParams.set("protected", "1");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};