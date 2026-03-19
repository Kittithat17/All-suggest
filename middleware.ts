import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value
  const url = req.nextUrl.pathname

  // ❗ ยังไม่ login
  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // 🔥 role-based access
  if (url.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/pos", req.url))
  }

  if (url.startsWith("/brand") && role !== "brand") {
    return NextResponse.redirect(new URL("/pos", req.url))
  }

  if (url.startsWith("/pos") && role !== "staff") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}
export const config = {
    matcher: ["/dashboard/:path*", "/brand/:path*", "/pos/:path*"],
  }