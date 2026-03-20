"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", revenue: 3200, expense: 1800 },
  { date: "2024-04-02", revenue: 2800, expense: 1500 },
  { date: "2024-04-03", revenue: 3500, expense: 2000 },
  { date: "2024-04-04", revenue: 4000, expense: 2200 },
  { date: "2024-04-05", revenue: 4200, expense: 2500 },
  { date: "2024-04-06", revenue: 3800, expense: 2100 },
  { date: "2024-04-07", revenue: 3600, expense: 1900 },

  { date: "2024-04-08", revenue: 4500, expense: 2600 },
  { date: "2024-04-09", revenue: 3000, expense: 1700 },
  { date: "2024-04-10", revenue: 4100, expense: 2300 },
  { date: "2024-04-11", revenue: 4700, expense: 2800 },
  { date: "2024-04-12", revenue: 3900, expense: 2000 },
  { date: "2024-04-13", revenue: 4400, expense: 2600 },
  { date: "2024-04-14", revenue: 3700, expense: 1800 },

  { date: "2024-04-15", revenue: 4200, expense: 2400 },
  { date: "2024-04-16", revenue: 3900, expense: 2200 },
  { date: "2024-04-17", revenue: 5200, expense: 3000 },
  { date: "2024-04-18", revenue: 4800, expense: 2700 },
  { date: "2024-04-19", revenue: 4100, expense: 2300 },
  { date: "2024-04-20", revenue: 3000, expense: 1500 },
  { date: "2024-04-21", revenue: 3500, expense: 1800 },

  { date: "2024-04-22", revenue: 4300, expense: 2500 },
  { date: "2024-04-23", revenue: 3900, expense: 2100 },
  { date: "2024-04-24", revenue: 5000, expense: 2900 },
  { date: "2024-04-25", revenue: 4600, expense: 2600 },
  { date: "2024-04-26", revenue: 3100, expense: 1600 },
  { date: "2024-04-27", revenue: 5400, expense: 3200 },
  { date: "2024-04-28", revenue: 3800, expense: 2000 },
  { date: "2024-04-29", revenue: 4200, expense: 2400 },
  { date: "2024-04-30", revenue: 5600, expense: 3400 },

  { date: "2024-05-01", revenue: 4000, expense: 2200 },
  { date: "2024-05-02", revenue: 4700, expense: 2600 },
  { date: "2024-05-03", revenue: 3900, expense: 2000 },
  { date: "2024-05-04", revenue: 5200, expense: 3100 },
  { date: "2024-05-05", revenue: 5800, expense: 3500 },
  { date: "2024-05-06", revenue: 6000, expense: 3700 },
  { date: "2024-05-07", revenue: 4900, expense: 2900 },

  { date: "2024-05-08", revenue: 3500, expense: 1900 },
  { date: "2024-05-09", revenue: 4200, expense: 2400 },
  { date: "2024-05-10", revenue: 4800, expense: 2800 },
  { date: "2024-05-11", revenue: 5100, expense: 3000 },
  { date: "2024-05-12", revenue: 4300, expense: 2500 },
  { date: "2024-05-13", revenue: 3900, expense: 2000 },
  { date: "2024-05-14", revenue: 6200, expense: 3800 },

  { date: "2024-05-15", revenue: 6500, expense: 4000 },
  { date: "2024-05-16", revenue: 5400, expense: 3200 },
  { date: "2024-05-17", revenue: 6800, expense: 4200 },
  { date: "2024-05-18", revenue: 5000, expense: 2900 },
  { date: "2024-05-19", revenue: 4200, expense: 2300 },
  { date: "2024-05-20", revenue: 3800, expense: 2000 },
  { date: "2024-05-21", revenue: 3100, expense: 1600 },

  { date: "2024-05-22", revenue: 3000, expense: 1500 },
  { date: "2024-05-23", revenue: 4500, expense: 2600 },
  { date: "2024-05-24", revenue: 4700, expense: 2800 },
  { date: "2024-05-25", revenue: 4200, expense: 2500 },
  { date: "2024-05-26", revenue: 4000, expense: 2200 },
  { date: "2024-05-27", revenue: 6000, expense: 3600 },
  { date: "2024-05-28", revenue: 4300, expense: 2400 },
  { date: "2024-05-29", revenue: 3200, expense: 1700 },
  { date: "2024-05-30", revenue: 5000, expense: 3000 },
  { date: "2024-05-31", revenue: 4100, expense: 2300 },

  { date: "2024-06-01", revenue: 4200, expense: 2400 },
  { date: "2024-06-02", revenue: 7000, expense: 4500 },
  { date: "2024-06-03", revenue: 3500, expense: 1800 },
  { date: "2024-06-04", revenue: 6200, expense: 3900 },
  { date: "2024-06-05", revenue: 3000, expense: 1500 },
  { date: "2024-06-06", revenue: 4800, expense: 2700 },
  { date: "2024-06-07", revenue: 5200, expense: 3100 },

  { date: "2024-06-08", revenue: 5600, expense: 3400 },
  { date: "2024-06-09", revenue: 6500, expense: 4000 },
  { date: "2024-06-10", revenue: 3900, expense: 2000 },
  { date: "2024-06-11", revenue: 3200, expense: 1600 },
  { date: "2024-06-12", revenue: 7200, expense: 4700 },
  { date: "2024-06-13", revenue: 3000, expense: 1500 },
  { date: "2024-06-14", revenue: 6100, expense: 3800 },

  { date: "2024-06-15", revenue: 5000, expense: 3000 },
  { date: "2024-06-16", revenue: 5500, expense: 3200 },
  { date: "2024-06-17", revenue: 7300, expense: 4800 },
  { date: "2024-06-18", revenue: 3400, expense: 1700 },
  { date: "2024-06-19", revenue: 4800, expense: 2600 },
  { date: "2024-06-20", revenue: 6000, expense: 3500 },
  { date: "2024-06-21", revenue: 4200, expense: 2400 },

  { date: "2024-06-22", revenue: 5000, expense: 2900 },
  { date: "2024-06-23", revenue: 7500, expense: 5000 },
  { date: "2024-06-24", revenue: 3600, expense: 1800 },
  { date: "2024-06-25", revenue: 3700, expense: 1900 },
  { date: "2024-06-26", revenue: 6400, expense: 3900 },
  { date: "2024-06-27", revenue: 6600, expense: 4200 },
  { date: "2024-06-28", revenue: 3500, expense: 1800 },
  { date: "2024-06-29", revenue: 3300, expense: 1700 },
  { date: "2024-06-30", revenue: 6800, expense: 4200 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                 stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
               stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
               fill="url(#fillRevenue)"
             stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
               dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
                stroke="var(--color-expense)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
