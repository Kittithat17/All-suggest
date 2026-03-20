"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">

        <Sidebar />

        <div className="flex-1 flex flex-col">
          
          {/* 🔥 Topbar */}
          <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <Input placeholder="Search..." className="w-[300px]" />

            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 space-y-6">
            {children}
          </main>
        </div>

      </div>
    </SidebarProvider>
  )
}