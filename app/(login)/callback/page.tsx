//app/%28login%29/callback/page.tsx
"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function CallbackPage() {
  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user
      const token = data.session?.access_token

      if (!user || !token) return

      // 🔥 insert profile (ถ้ายังไม่มี)
      const { data: existing } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
    
    if (!existing) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        role: "staff",
      })
    }

      // 🔥 ยิง backend เอา role
      const res = await fetch("http://localhost:3001/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()
      const role = result.user.role
      document.cookie = `role=${role}; path=/`
      // 🔥 redirect ตาม role
      if (role === "admin") {
        window.location.href = "/dashboard"
      } else if (role === "brand") {
        window.location.href = "/brand"
      } else {
        window.location.href = "/pos"
      }
    }

    run()
  }, [])

  return <p>Logging you in...</p>
}