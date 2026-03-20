"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, TrendingUp, Sparkles } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-6">

      {/* 🔥 Header */}
      <div className="mb-10 text-white">
        <h1 className="text-5xl font-bold">Grow Your Brand 🚀</h1>
        <p className="mt-2 text-white/80">
          Boost your products in AI recommendations
        </p>
      </div>

      {/* 💎 Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* 🟢 Starter */}
        <Card className="h-full rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Starter</CardTitle>
            <CardDescription>Get into the system</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col justify-between h-full">

            <div className="space-y-4">
              <div className="text-4xl font-bold">
                $1900 <span className="text-sm font-normal">/ month</span>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check size={16}/> 5 products in AI system</li>
                <li className="flex items-center gap-2"><Check size={16}/> Basic recommendation exposure</li>
                <li className="flex items-center gap-2"><Check size={16}/> Basic analytics</li>
              </ul>
            </div>

            <Button className="w-full mt-6 py-5">Activate</Button>
          </CardContent>
        </Card>

        {/* 🔵 Boost */}
        <Card className="h-full rounded-2xl shadow-lg border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Boost <TrendingUp size={16} />
            </CardTitle>
            <CardDescription>Increase visibility & performance</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col justify-between h-full">

            <div className="space-y-4">
              <div className="text-4xl font-bold">
                $4900 <span className="text-sm font-normal">/ month</span>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check size={16}/> 20 products boosted</li>
                <li className="flex items-center gap-2"><Check size={16}/> Priority AI recommendation</li>
                <li className="flex items-center gap-2"><Check size={16}/> Performance analytics</li>
                <li className="flex items-center gap-2"><Check size={16}/> Trending insights</li>
              </ul>
            </div>

            <Button className="w-full mt-6 py-5">Activate</Button>
          </CardContent>
        </Card>

        {/* 🟣 Dominance */}
        <Card className="h-full rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Dominance <Sparkles size={16} />
            </CardTitle>
            <CardDescription>Control the recommendation space</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col justify-between h-full">

            <div className="space-y-4">
              <div className="text-4xl font-bold">
                $9900 <span className="text-sm font-normal">/ month</span>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check size={16}/> Unlimited products</li>
                <li className="flex items-center gap-2"><Check size={16}/> Top AI ranking priority</li>
                <li className="flex items-center gap-2"><Check size={16}/> Real-time analytics</li>
                <li className="flex items-center gap-2"><Check size={16}/> AI auto-optimization</li>
              </ul>
            </div>

            <Button className="w-full mt-6 py-5" >Activate</Button>
          </CardContent>
        </Card>

      </div>

      {/* ⚫ Bottom CTA */}
      <div className="mt-10 rounded-2xl bg-black p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Enterprise AI Solution</h3>
          <p className="text-white/70">
            Custom AI model training & premium placement
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">Custom</div>
          <Button variant="secondary">Contact Sales</Button>
        </div>
      </div>

    </div>
  )
}