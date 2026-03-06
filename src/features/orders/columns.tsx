import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "./types";
import { formatDateTime } from "@/utils/formatDateTime ";
import { Badge } from "@/components/ui/badge";

const ordersColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-dark">
        #{row.original.orderId}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span className="">{row.original.userEmail}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original.createdAt);
      return (
        <div className="flex justify-center items-center gap-xs font-medium">
          <span className="text-blue-500">{date}</span>
          <span className="text-gray-400">-</span>
          <span className="text-gray-500">{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const orderStatus = row.original.orderStatus.toLowerCase();
      const statusColor =
        orderStatus === "pending"
          ? "text-yellow-600 bg-yellow-200 border-yellow-300"
          : orderStatus === "shipped"
            ? "text-purple-700 bg-purple-200 border-purple-300"
            : orderStatus === "paid"
              ? "text-blue-700 bg-blue-200 border-blue-300"
              : orderStatus === "completed"
                ? "text-green-700 bg-green-200 border-green-300"
                : orderStatus === "cancelled"
                  ? "text-red-800 bg-red-200 border-red-300"
                  : "text-light bg-zinc-700";

      return (
        <span className="">
          <Badge className={`${statusColor} border rounded-sm`}>
            {orderStatus ? row.original.orderStatus : "Unknown"}
          </Badge>
        </span>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ row }) => (
      <span className="font-medium text-accent-strong">
        &pound;{row.original.totalAmount.toLocaleString("en-GB")}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus.toLowerCase();
      const indicatorColor =
        paymentStatus === "pending"
          ? "bg-yellow-500"
          : paymentStatus === "completed"
            ? "bg-green-500"
            : paymentStatus === "failed" && "bg-red-500";
      const statusColor =
        paymentStatus === "pending"
          ? "text-yellow-700 bg-yellow-100"
          : paymentStatus === "completed"
            ? "text-green-600 bg-green-100"
            : paymentStatus === "failed"
              ? "text-red-500 bg-red-100"
              : "text-gray-500 bg-gray-100";
      return (
        <div className="">
          <Badge className={`${statusColor} rounded-sm`}>
            {(paymentStatus === "pending" ||
              paymentStatus === "completed" ||
              paymentStatus === "failed") && (
              <span
                className={`w-1.5 h-1.5 me-0.5 ${indicatorColor} rounded-full`}
              />
            )}
            {paymentStatus ? row.original.paymentStatus : "Unknown"}
          </Badge>
        </div>
      );
    },
  },
];

export default ordersColumns;
