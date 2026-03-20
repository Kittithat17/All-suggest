"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"


type Product = {
  id: string
  product_name: string
  category: string
  unit_price_thb: number
}

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetch("http://localhost:3001/api/products/categories")
      .then(res => res.json())
      .then(data => {
        const unique = Array.from(new Set(["All", ...data]))
        setCategories(unique)
      })
  }, [])

  useEffect(() => {
    const url =
      selectedCategory === "All"
        ? "http://localhost:3001/api/products"
        : `http://localhost:3001/api/products?category=${encodeURIComponent(selectedCategory)}`

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [selectedCategory])

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product])
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  )

  const total = cart.reduce((sum, item) => sum + item.unit_price_thb, 0)

  return (
    <div className="min-h-screen bg-background text-foreground p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        🛒 POS System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PRODUCT */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* SEARCH */}
            <Input
              placeholder="🔍 Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* CATEGORY */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <Separator />

            {/* PRODUCT LIST */}
            <ScrollArea className="h-[450px] pr-2">
              <div className="space-y-3">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center border rounded-xl p-3 hover:bg-muted transition"
                  >
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-green-500">
                        {product.unit_price_thb}฿
                      </span>

                      <Button size="sm" onClick={() => addToCart(product)}>
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

          </CardContent>
        </Card>

        {/* CART */}
        <Card className="shadow-lg rounded-2xl flex flex-col">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 space-y-4">

            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-xl p-3"
                  >
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>{item.unit_price_thb}฿</span>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            {/* TOTAL */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total}฿</span>
            </div>

            <Button size="lg" className="w-full">
              🚀 Get Recommendations
            </Button>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}