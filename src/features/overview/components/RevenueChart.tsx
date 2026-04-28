import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useOverviewData } from '../hooks/useOverviewData';
import Loading from '@/components/shared/Loading';
import Error from '@/components/shared/Error';

const chartConfig = {
  onlineRevenue: {
    label: 'Online Revenue',
    color: '#02a588',
  },
  posRevenue: {
    label: 'POS Revenue',
    color: '#83c6a1',
  },
  totalRevenue: {
    label: 'Total Revenue',
    color: 'var(--chart-3)',
  },
};

function RevenueChart() {
  const { revenueData, isLoading, isError } = useOverviewData();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error
        title="Revenue Data Error"
        message="Failed to load revenue data. Please try again later."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
