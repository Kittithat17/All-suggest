//app/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value
  const url = req.nextUrl.pathname

  // ❗ ยังไม่ login
  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // 🔥 map role → home
  const roleHome: Record<string, string> = {
    admin: "/dashboard",
    staff: "/pos",
    brand: "/brand",
  }

  const userHome = roleHome[role]

  // 🔥 ถ้าเข้า route ผิด → เด้งกลับ home
  if (url.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL(userHome, req.url))
  }

  if (url.startsWith("/pos") && role !== "staff") {
    return NextResponse.redirect(new URL(userHome, req.url))
  }

  if (url.startsWith("/brand") && role !== "brand") {
    return NextResponse.redirect(new URL(userHome, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/brand/:path*", "/pos/:path*"],
}