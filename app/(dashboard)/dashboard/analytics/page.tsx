"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Product {
  id: string;
  product_name: string;
  category: string;
}

export default function AnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 🔥 mock stock (stable per render)
  const stockData = useMemo(() => {
    return products.map((p) => {
      // eslint-disable-next-line react-hooks/purity
      const stock = Math.floor(Math.random() * 100);
      return {
        id: p.id,
        name: p.product_name,
        category: p.category,
        stock,
        status: stock < 20 ? "low" : "ok",
      };
    });
  }, [products]);

  // 🔥 group by category
  const categoryMap: Record<string, number> = {};
  products.forEach((p) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  // 🔥 low stock list
  const lowStock = stockData.filter((item) => item.stock < 20);

  // 🔥 category has low?
  const categoryStockMap: Record<string, number[]> = {};

  stockData.forEach((item) => {
    if (!categoryStockMap[item.category]) {
      categoryStockMap[item.category] = [];
    }
    categoryStockMap[item.category].push(item.stock);
  });
  
  const lowCategoryMap: Record<string, boolean> = {};
  
  Object.entries(categoryStockMap).forEach(([cat, stocks]) => {
    const avg = stocks.reduce((a, b) => a + b, 0) / stocks.length;
    lowCategoryMap[cat] = avg < 20; // ใช้ average
  });

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto ml-[-10]">
      {/* LEFT */}
      <div className="flex flex-col gap-6 flex-1">
        <h1 className="text-2xl font-bold">Product Analytics</h1>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-red-500">
                {lowStock.length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-bold">{categoryData.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Products per Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={lowCategoryMap[entry.name] ? "#ef4444" : "#111827"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock grid */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Status</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stockData.slice(0, 21).map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-xl flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {item.stock}
                  </p>
                </div>

                {item.status === "low" ? (
                  <Badge variant="destructive">Low</Badge>
                ) : (
                  <Badge>OK</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-[320px]">
      <Card className="flex flex-col max-h-[80vh]">
    
    {/* Header */}
    <CardHeader className="sticky top-0 bg-background z-10 border-b">
      <CardTitle>⚠️ Low Stock Alert</CardTitle>
    </CardHeader>

    {/* Scroll area */}
    <CardContent className="flex-1 overflow-y-auto space-y-3 pr-2">
      {lowStock.length === 0 ? (
        <p className="text-sm text-muted-foreground">No low stock 🎉</p>
      ) : (
        lowStock.map((item) => (
          <div
            key={item.id}
            className="p-3 border rounded-lg flex justify-between items-center hover:bg-muted/50 transition"
          >
            <span className="text-sm">{item.name}</span>
            <Badge variant="destructive">{item.stock}</Badge>
          </div>
        ))
      )}
    </CardContent>
  </Card>
      </div>
    </div>
  );
}
