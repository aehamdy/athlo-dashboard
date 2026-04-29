import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Currency from '@/components/shared/Currency';
import { formatDateTime } from '@/utils/formatDateTime';
import { useOverviewData } from '../hooks/useOverviewData';
import type { RecentOrder } from '../types';
import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon';
import { ROUTE_PATHS } from '@/routes/paths';

function RecentOrdersTable() {
  const { recentOrders } = useOverviewData();

  const statusStyles: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-600',
    Shipped: 'bg-purple-100 text-purple-700',
    Paid: 'bg-blue-100 text-blue-600',
    Completed: 'bg-green-100 text-green-700',
  };

  return (
    <Card className="h-full flex flex-col gap-sm">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Recent Orders</CardTitle>

        <Link
          to={ROUTE_PATHS.dashboard.orders}
          className="group flex items-center gap-tiny font-medium text-xs text-accent-strong hover:text-accent"
        >
          View All Orders
          <Icon
            name="ArrowRight"
            className="text-accent-strong group-hover:text-accent group-hover:translate-x-tiny transition-all duration-normal"
          />
        </Link>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr className="text-center border-b">
              <th className="py-2">Order</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody className="h-[190px] md:h-[200px] overflow-auto">
            {recentOrders?.map((order: RecentOrder) => {
              const { date } = formatDateTime(order.createdAt);
              const customerName =
                order.customerName.split('.')[0].charAt(0).toUpperCase() +
                order.customerName.split('.')[0].slice(1) +
                ' ' +
                order.customerName.split('.')[1].charAt(0).toUpperCase() +
                order.customerName.split('.')[1].slice(1);

              return (
                <tr
                  key={order.orderId}
                  className="border-b last:border-0 text-center hover:bg-gray-50 transition"
                >
                  <td className="py-2 font-semibold">#{order.orderId}</td>

                  <td className="py-2 font-semibold">{customerName}</td>

                  <td className="py-2 text-muted-foreground">{date}</td>

                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-2 text-right font-semibold">
                    <Currency symbol /> {order.totalAmount.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default RecentOrdersTable;
