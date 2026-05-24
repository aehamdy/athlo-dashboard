import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Label } from 'recharts';
import type { OrderStatusChartType } from '../types';

type OrderStatusChartProps = {
  orderStatusData: OrderStatusChartType[];
};

type ChartItem = {
  status: string;
  count: number;
  fill: string;
};

const chartConfig = {
  Pending: { label: 'Pending', color: '#fcd566' },
  Cancelled: { label: 'Cancelled', color: '#fbb2ac' },
  Shipped: { label: 'Shipped', color: '#9b87c6' },
  Paid: { label: 'Paid', color: '#27c4de' },
  Completed: { label: 'Completed', color: '#88c8a4' },
};

function OrderStatusChart({ orderStatusData }: OrderStatusChartProps) {
  const chartData: ChartItem[] = orderStatusData?.map((item) => ({
    status: item.status,
    count: item.count,
    fill: chartConfig[item.status as keyof typeof chartConfig]?.color || '#ccc',
  }));

  const totalOrders = chartData?.reduce(
    (acc, curr) => acc + (curr.count || 0),
    0,
  );

  return (
    <Card className="h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders.toLocaleString()}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Orders
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="grid grid-cols-2 gap-sm">
          {chartData?.map((item) => {
            const percentage =
              totalOrders > 0
                ? ((item.count / totalOrders) * 100).toFixed(1)
                : 0;

            return (
              <div key={item.status} className="flex items-center gap-1">
                <span
                  className="h-2 w-2 rounded-[0.150rem]"
                  style={{ backgroundColor: item.fill }}
                />

                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.status} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderStatusChart;
