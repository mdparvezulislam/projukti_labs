import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Canonical Hostname Enforcement: Redirect www.projuktilabs.tech -> projuktilabs.tech
  if (host.startsWith("www.")) {
    const canonicalHost = host.replace(/^www\./, "");
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 308 });
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
