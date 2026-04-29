import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Currency from '@/components/shared/Currency';
import { formatDateTime } from '@/utils/formatDateTime';
import type { RecentOrder } from '../types';
import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon';
import { ROUTE_PATHS } from '@/routes/paths';

type RecentOrdersTableProps = {
  recentOrders: RecentOrder[];
};

function RecentOrdersTable({ recentOrders }: RecentOrdersTableProps) {
  const statusStyles: Record<string, string> = {
    Pending: 'text-yellow-600 bg-yellow-100 border-yellow-300',
    Cancelled: 'text-red-600 bg-red-50 border-red-200',
    Shipped: 'text-purple-600 bg-purple-100 border-purple-300',
    Paid: 'text-blue-600 bg-blue-100 border-blue-300',
    Completed: 'text-green-600 bg-green-50 border-green-200',
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
