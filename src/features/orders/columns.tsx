import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "./types";
import { formatDateTime } from "@/utils/formatDateTime";
import { Badge } from "@/components/ui/badge";
import { orderStatusConfig } from "./utils/orderStatusConfig";
import { paymentStatusConfig } from "./utils/paymentStatusConfig";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderStatuses, statusStringToNumber } from "./constants";

const ordersColumns = (onUpdateStatus: (data: { orderId: number; status: number }) => void): ColumnDef<Order>[] => [
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
      const orderId = row.original.orderId
      const orderStatus = row.original.orderStatus;
      const orderStatusNumber = statusStringToNumber[row.original.orderStatus] ?? 0;

      return (
        <div className="flex justify-center">
          <Select
            value={String(orderStatusNumber)}
            onValueChange={(value) => {
              onUpdateStatus({
                orderId,
                status: Number(value),
              });
            }}
          >
            <SelectTrigger className={`w-full max-w-[115px] py-[2px] px-[8px] max-h-[26px] rounded-xl ${orderStatusConfig[orderStatus]?.className
              } focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent-soft`}>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {orderStatuses.map((status) => {
                const label = status.label;
                const className = orderStatusConfig[label]?.className ?? '';
                return (
                  <SelectItem
                    key={status.value}
                    value={String(status.value)}
                    className={`mb-tiny ${className} rounded-sm`}
                  >
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      )
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
      const rawStatus = row.original.paymentStatus;

      const normalizedStatus =
        rawStatus?.charAt(0).toUpperCase() + rawStatus?.slice(1).toLowerCase();

      const config = paymentStatusConfig[normalizedStatus] ?? {
        label: rawStatus ?? "Unknown",
        indicatorColor: "bg-gray-400",
        className: "text-gray-500 bg-gray-100",
      };

      const { label, indicatorColor, className } = config;

      return (
        <div className="">
          <Badge className={`${className} rounded-sm`}>
            {(label === "Pending" ||
              label === "Completed" ||
              label === "Failed") && (
                <span
                  className={`w-1.5 h-1.5 me-0.5 ${indicatorColor} rounded-full`}
                />
              )}
            {label}
          </Badge>
        </div>
      );
    },
  },
];

export default ordersColumns;
