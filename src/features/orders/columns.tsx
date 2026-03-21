import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "./types";
import { formatDateTime } from "@/utils/formatDateTime";
import { orderStatusConfig } from "./utils/orderStatusConfig";
import { paymentStatusConfig } from "./utils/paymentStatusConfig";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderStatuses, paymentStatuses, paymentStatusStringToNumber, statusStringToNumber } from "./constants";
import getAllowedOrderStatuses from "./utils/getAllowedOrderStatuses ";

const ordersColumns = (
  onUpdateOrderStatus: (data: { orderId: number; status: number }) => void,
  onUpdatePaymentStatus: (data: { orderId: number; status: number }) => void
): ColumnDef<Order>[] => [
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
        const orderStatusNumber = statusStringToNumber[orderStatus] ?? 0;
        const allowedOptions = getAllowedOrderStatuses(orderStatusNumber);

        return (
          <div className="flex justify-center">
            <Select
              value={String(orderStatusNumber)}
              onValueChange={(value) => {
                onUpdateOrderStatus({
                  orderId,
                  status: Number(value),
                });
              }}
              disabled={orderStatusNumber === 4}
            >
              <SelectTrigger className={`w-full max-w-[115px] py-[2px] px-[8px] max-h-[26px] rounded-xl ${orderStatusConfig[orderStatus]?.className
                } focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent-soft`}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {allowedOptions.map((status) => {
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
        const orderId = row.original.orderId;
        const paymentStatus = row.original.paymentStatus;
        const paymentStatusNumber = paymentStatusStringToNumber[paymentStatus] ?? 0;

        return (
          <div className="flex justify-end">
            <Select
              value={String(paymentStatusNumber)}
              onValueChange={(value) => {
                onUpdatePaymentStatus({
                  orderId,
                  status: Number(value),
                });
              }}
            >
              <SelectTrigger
                className={`w-full max-w-[115px] py-[2px] px-[8px] max-h-[26px] rounded-xl ${paymentStatusConfig[paymentStatus]?.className} 
                  focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent-soft`}
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {paymentStatuses.map((payment) => {
                  const label = payment.label;
                  const className = paymentStatusConfig[label]?.className ?? '';

                  return (
                    <SelectItem
                      key={payment.value}
                      value={String(payment.value)}
                      className={`mb-tiny ${className} rounded-sm`}
                    >
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        );
      },
    },
  ];

export default ordersColumns;
