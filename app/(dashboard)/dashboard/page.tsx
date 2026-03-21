import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { ChartAreaInteractive } from "@/components/finance-chart";

const data = [
  { id: 1, name: "Brand A", amount: 1900, status: "Paid" },
  { id: 2, name: "Brand B", amount: 4900, status: "Pending" },
  { id: 3, name: "Brand C", amount: 9900, status: "Paid" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your business performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,000</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,000</div>
            <p className="text-xs text-muted-foreground">
              -4.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$14,000</div>
            <p className="text-xs text-muted-foreground">Strong growth 📈</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Revenue vs Expense (Last 6 months)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartAreaInteractive />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best performing products this week</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {[
            { name: "Coke 325ml", sales: 120, growth: "+12%" },
            { name: "Oishi Green Tea", sales: 98, growth: "+8%" },
            { name: "Soy Sauce 500ml", sales: 76, growth: "+5%" },
            { name: "Snickers Bar", sales: 65, growth: "+3%" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.sales} sales
                </p>
              </div>

              <Badge className="bg-green-100 text-green-700 border border-green-200">
                {item.growth}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
