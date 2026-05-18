import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import type { RevenueChartType } from '../types';

import { memo, useEffect, useState } from 'react';

import chartConfig from './chartConfig';

type RevenueDataProps = {
  revenueData: RevenueChartType[];
};

function RevenueChart({ revenueData }: RevenueDataProps) {
  const [showChart, setShowChart] = useState(false);

  // Delay heavy chart rendering until after first paint
  useEffect(() => {
    const id = requestIdleCallback(() => {
      setShowChart(true);
    });

    return () => cancelIdleCallback(id);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">
        {!showChart ? (
          <div className="h-full animate-pulse rounded-md bg-muted" />
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <BarChart accessibilityLayer data={revenueData}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(5)}
                />

                <ChartTooltip content={<ChartTooltipContent hideLabel />} />

                <ChartLegend content={<ChartLegendContent />} />

                <Bar
                  dataKey="onlineRevenue"
                  stackId="a"
                  fill={chartConfig.onlineRevenue.color}
                  radius={[0, 0, 4, 4]}
                />

                <Bar
                  dataKey="posRevenue"
                  stackId="a"
                  fill={chartConfig.posRevenue.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(RevenueChart);
