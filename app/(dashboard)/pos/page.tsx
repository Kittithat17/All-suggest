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

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type Product = {
  id: string
  product_name: string
  category: string
  unit_price_thb: number
}

type Recommendation = {
  product_name: string
  category: string
  price_thb: number
  score: number
  tier: string
}

type RecommendationResponse = {
  basket_analyzed: string[]
  invalid_items: string[]
  context: { hour: number; customer_id: string | null }
  recommendations: Recommendation[]
  inference_ms: number
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

// --- ADDED: Central API base URL for all 3 endpoints ---
const API_BASE = "https://recommendai.onrender.com"

const tierColor: Record<string, string> = {
  upsell:     "bg-amber-100 text-amber-800",
  impulse:    "bg-pink-100 text-pink-800",
  cross_sell: "bg-blue-100 text-blue-800",
}

// ─────────────────────────────────────────────
// HELPER: generate transaction ID
// ─────────────────────────────────────────────

// --- ADDED: Generates a unique transaction ID like TXN_20260321_001 ---
const generateTransactionId = (): string => {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, "")
  const seq = String(Math.floor(Math.random() * 1000)).padStart(3, "0")
  return `TXN_${date}_${seq}`
}

// ─────────────────────────────────────────────
// API FUNCTION 1: Get Recommendations
// ─────────────────────────────────────────────

// --- ADDED: Calls /recommend with basket items and current hour ---
const fetchRecommendations = async (
  cartItems: string[]
): Promise<RecommendationResponse> => {
  const hour = new Date().getHours()
  const basket = cartItems.join(",")

  const res = await fetch(
    `${API_BASE}/recommend?basket=${encodeURIComponent(basket)}&hour=${hour}`
  )
  if (!res.ok) throw new Error(`Recommend API error: ${res.status}`)
  return res.json()
}

// ─────────────────────────────────────────────
// API FUNCTION 2: Save Transaction
// ─────────────────────────────────────────────

// --- ADDED: POSTs transaction data to /transaction at checkout ---
const saveTransaction = async (
  transactionId: string,
  cartItems: Product[],
  customerId: string | null = null
): Promise<void> => {
  const now = new Date()
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const body = {
    transaction_id: transactionId,
    customer_id:    customerId ?? "GUEST",
    cart_items:     cartItems.map(i => i.product_name),
    quantities:     cartItems.map(() => 1),
    hour_of_day:    now.getHours(),
    day_of_week:    days[now.getDay()],
    is_weekend:     now.getDay() === 0 || now.getDay() === 6,
  }

  const res = await fetch(`${API_BASE}/transaction`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Transaction API error: ${res.status}`)
}

// ─────────────────────────────────────────────
// API FUNCTION 3: Log Feedback
// ─────────────────────────────────────────────

// --- ADDED: POSTs recommendation feedback to /feedback ---
// Called once per recommended item after checkout.
// was_purchased = true if customer added the recommended item to cart.
const logFeedback = async (
  transactionId: string,
  cartItems: string[],
  recommendedProductName: string,
  wasPurchased: boolean
): Promise<void> => {
  const body = {
    transaction_id: transactionId,
    cart_items:     cartItems,
    product_name:   recommendedProductName,
    was_purchased:  wasPurchased,
  }

  const res = await fetch(`${API_BASE}/feedback`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Feedback API error: ${res.status}`)
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function POSPage() {
  const [products, setProducts]                   = useState<Product[]>([])
  const [cart, setCart]                           = useState<Product[]>([])
  const [search, setSearch]                       = useState("")
  const [categories, setCategories]               = useState<string[]>([])
  const [selectedCategory, setSelectedCategory]   = useState("All")

  // Recommendation modal state
  const [showModal, setShowModal]   = useState(false)
  const [recData, setRecData]       = useState<RecommendationResponse | null>(null)
  const [recLoading, setRecLoading] = useState(false)
  const [recError, setRecError]     = useState<string | null>(null)

  // --- ADDED: Track which recommended items were added (for feedback logging) ---
  const [addedRecs, setAddedRecs] = useState<Set<string>>(new Set())

  // --- ADDED: Store txn ID so the same ID is used for transaction + feedback ---
  const [currentTxnId, setCurrentTxnId] = useState<string>("")

  // --- ADDED: Checkout loading state ---
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/api/products/categories")
      .then(res => res.json())
      .then(data => {
        const unique = Array.from(new Set(["All", ...data]))
        setCategories(unique as string[])
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

  // ── HANDLER 1: Get Recommendations ──────────────────────────────────────────

  // --- ADDED: Calls FUNCTION 1 (fetchRecommendations) and opens the modal ---
  const handleGetRecommendations = async () => {
    if (cart.length === 0) return

    setRecLoading(true)
    setRecError(null)
    setRecData(null)
    setAddedRecs(new Set())
    setShowModal(true)

    // Generate txn ID now so it's ready for both saveTransaction + logFeedback
    const txnId = generateTransactionId()
    setCurrentTxnId(txnId)

    try {
      const cartNames = cart.map(item => item.product_name)
      const data = await fetchRecommendations(cartNames)  // FUNCTION 1
      setRecData(data)
    } catch (err: unknown) {
      setRecError(err instanceof Error ? err.message : "Failed to fetch recommendations")
    } finally {
      setRecLoading(false)
    }
  }

  // ── HANDLER 2: Add recommended item + mark it for feedback ──────────────────

  // --- ADDED: Tracks which recs were added so feedback knows was_purchased ---
  const addRecommendedToCart = (rec: Recommendation) => {
    const match = products.find(p => p.product_name === rec.product_name)
    if (match) {
      addToCart(match)
    } else {
      addToCart({
        id:             rec.product_name,
        product_name:   rec.product_name,
        category:       rec.category,
        unit_price_thb: rec.price_thb,
      })
    }
    setAddedRecs(prev => new Set(prev).add(rec.product_name))
  }

  // ── HANDLER 3: Checkout — calls FUNCTION 2 + FUNCTION 3 ─────────────────────

  // --- ADDED: Saves the transaction, then logs feedback for every recommendation
  //            that was shown. was_purchased = true only if customer added it. ---
  const handleCheckout = async () => {
    if (cart.length === 0) return
    setCheckoutLoading(true)

    try {
      // FUNCTION 2: Save transaction
      await saveTransaction(currentTxnId, cart)

      // FUNCTION 3: Log feedback for each recommendation that was shown
      if (recData && recData.recommendations.length > 0) {
        const cartNames = cart.map(i => i.product_name)
        await Promise.all(
          recData.recommendations.map(rec =>
            logFeedback(
              currentTxnId,
              cartNames,
              rec.product_name,
              addedRecs.has(rec.product_name)  // true only if customer added it
            )
          )
        )
      }

      // Reset state after successful checkout
      setCart([])
      setRecData(null)
      setAddedRecs(new Set())
      setShowModal(false)
      alert("✅ Checkout complete!")
    } catch (err: unknown) {
      alert(`Checkout failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setCheckoutLoading(false)
    }
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">🛒 POS System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── PRODUCTS ── */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="🔍 Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

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

            <ScrollArea className="h-[450px] pr-2">
              <div className="space-y-3">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center border rounded-xl p-3 hover:bg-muted transition"
                  >
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-green-500">
                        {product.unit_price_thb}฿
                      </span>
                      <Button size="sm" onClick={() => addToCart(product)}>Add</Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* ── CART ── */}
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
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{item.unit_price_thb}฿</span>
                      <Button size="icon" variant="ghost" onClick={() => removeFromCart(index)}>
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total}฿</span>
            </div>

            {/* Get Recommendations — calls FUNCTION 1 */}
            <Button
              size="lg"
              className="w-full"
              disabled={cart.length === 0}
              onClick={handleGetRecommendations}
            >
              🚀 Get Recommendations
            </Button>

            {/* --- ADDED: Checkout button — calls FUNCTION 2 + FUNCTION 3 --- */}
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              disabled={cart.length === 0 || checkoutLoading}
              onClick={handleCheckout}
            >
              {checkoutLoading ? "Processing..." : "💳 Checkout"}
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* ── RECOMMENDATION MODAL ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">✨ Recommendations</h2>
              <Button size="icon" variant="ghost" onClick={() => setShowModal(false)}>✕</Button>
            </div>

            <Separator />

            {/* Loading */}
            {recLoading && (
              <div className="flex flex-col items-center py-8 gap-3 text-muted-foreground">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Analyzing your basket...</p>
              </div>
            )}

            {/* Error */}
            {recError && (
              <div className="text-center py-6 text-red-500 text-sm">⚠️ {recError}</div>
            )}

            {/* Results */}
            {recData && !recLoading && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Based on {recData.basket_analyzed.length} item(s) · {recData.inference_ms.toFixed(0)}ms
                </p>

                {recData.invalid_items?.length > 0 && (
                  <div className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                    ⚠️ Not recognized: {recData.invalid_items.join(", ")}
                  </div>
                )}

                <div className="space-y-3">
                  {recData.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border rounded-xl p-3 hover:bg-muted transition"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{rec.product_name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">{rec.category}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierColor[rec.tier] ?? "bg-gray-100 text-gray-700"}`}>
                            {rec.tier.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-semibold text-green-500 text-sm">{rec.price_thb}฿</span>
                        {/* --- EDITED: Shows "Added ✓" state after clicking --- */}
                        <Button
                          size="sm"
                          variant={addedRecs.has(rec.product_name) ? "outline" : "default"}
                          onClick={() => addRecommendedToCart(rec)}
                        >
                          {addedRecs.has(rec.product_name) ? "Added ✓" : "Add"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}