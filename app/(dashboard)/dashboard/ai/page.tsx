"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
type Product = {
  id: number;
  name: string;
  image: string;
  stock: number;
  trend: string;
  insight: string;
  priorityLabel?: "High" | "Medium" | "Low";
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Sparkles, TrendingDown } from "lucide-react";

// 🔥 mock data
const products: Product[] = [
  {
    id: 1,
    name: "Meiji Milk 2L",
    image:
      "https://www.cpmeiji.com/attachment/product/37dc838f5bc8ae5c537ce853042939b02b_3DMeijiPasteurized2000mlFresh700x730.png",
    stock: 120,
    trend: "Low Sales",
    insight:
      "📊 ระบบพบว่าสินค้านี้มียอดขายสูงสุดในวันพุธช่วงเวลา 18:00 น.\n\n💡 แนะนำให้จัดโปรโมชั่นลดราคา 10% ในช่วงเวลาดังกล่าว เพื่อเร่งระบายสต๊อกและเพิ่มยอดขาย",
  },
  {
    id: 2,
    name: "Lay's Sour Cream",
    image: "https://d19oj5aeuefgv.cloudfront.net/0057224",
    stock: 80,
    trend: "Slow Moving",
    insight:
      "📊 AI วิเคราะห์พบว่า สินค้ามียอดขายเพิ่มขึ้นในคืนวันศุกร์\n\n💡 แนะนำให้ทำโปรโมชั่นแบบ Bundle คู่กับเครื่องดื่ม เพื่อเพิ่มโอกาสในการซื้อ",
  },
  {
    id: 3,
    name: "ปลากระป๋องโรซ่า",
    image:
      "https://img.th.my-best.com/product_images/448efffde94dfeaa3b10c2709ea69481.png?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=d8bbf8531f53b6cd5c4f97bd55c31790",
    stock: 200,
    trend: "Overstock",
    insight:
      "📊 AI พบว่า สินค้ามียอดขายสูงในช่วงวันหยุดสุดสัปดาห์\n\n💡 แนะนำให้จัดโปรโมชั่น ซื้อ 1 แถม 1 ในช่วงบ่ายวันเสาร์ เพื่อเร่งการขาย",
  },
  {
    id: 4,
    name: "ร่มกันฝน",
    image:
      "https://media.allonline.7eleven.co.th/pdmain/462316-03-Rainwears-my-item-v1.jpg",
    stock: 10,
    trend: "Seasonal Opportunity",
    insight:
      "🌧️ ระบบตรวจพบว่าเข้าสู่ฤดูฝน และมีโอกาสที่ลูกค้าจะต้องการสินค้ากลุ่มกันฝน\n\n💡 แนะนำให้เพิ่มสต๊อก 'ร่มกันฝน' และวางหน้าร้าน พร้อมทำโปรโมชันเล็กน้อยเพื่อกระตุ้นยอดขาย",
    priorityLabel: "High",
  },
];

export default function AIPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const getPriorityColor = (level?: string) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-gray-100 text-gray-600";
      default:
        return "";
    }
  };
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Seasonal Opportunity":
        return "bg-green-100 text-green-600";
      case "Low Sales":
        return "bg-red-100 text-red-600";
      case "Slow Moving":
        return "bg-yellow-100 text-yellow-600";
      case "Overstock":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-600" />
          Stock Recommendation
        </h1>
        <p className="text-muted-foreground">
          Let AI suggest the best timing and strategy to boost your sales
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>Current Stock: {product.stock}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Image */}
              <div className="relative w-full h-52 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Status */}
              <Badge
                className={`flex items-center gap-1 ${getTrendColor(
                  product.trend
                )}`}
              >
                <TrendingDown className="w-3 h-3" />
                {product.trend}
              </Badge>

              {product.priorityLabel && (
                <div
                  className={`text-xs px-2 py-1 rounded-md w-fit font-medium ${getPriorityColor(
                    product.priorityLabel
                  )}`}
                >
                  🔥 {product.priorityLabel} Priority
                </div>
              )}

              {/* Button */}
              <Button
                className="w-full h-9"
                onClick={() => setSelectedProduct(product)}
              >
                Get Recommendation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Recommendation
            </DialogTitle>
            <DialogDescription>{selectedProduct?.name}</DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              {/* Image */}
              <div className="relative w-full h-72 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-6"
                />
              </div>

              {selectedProduct.priorityLabel && (
                <div
                  className={`text-sm px-3 py-2 rounded-lg font-medium ${getPriorityColor(
                    selectedProduct.priorityLabel
                  )}`}
                >
                  🔥 ระดับความสำคัญ: {selectedProduct.priorityLabel}
                </div>
              )}

              {/* Insight */}
              <div className="p-4 bg-muted rounded-xl text-sm font-sans leading-relaxed whitespace-pre-line">
                {selectedProduct.insight}
              </div>

              {/* Action */}
              <Button className="w-full h-10 bg-green-700 hover:bg-purple-700 font-extrabold ">
                Apply Promotion
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
