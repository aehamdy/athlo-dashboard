import type { Order } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import TableWrapper from "./sharedComponents/TableWrapper";

function OrdersTable({ data }: { data: Order[] }) {
  const orderDateTime = (date: string) => {
    const orderDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const orderTime = new Date(date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${orderDate} - ${orderTime}`;
  };

  return (
    <TableWrapper>
      <Table className="rounded-md overflow-hidden">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-neutral cursor-default">
          <TableRow className="text-center">
            <TableHead className="text-start">Order</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Customer</TableHead>
            <TableHead className="text-center">Payment</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order) => (
            <TableRow className="">
              <TableCell className="font-semibold">#{order.orderId}</TableCell>

              <TableCell className="text-center font-medium text-cyan-600">
                {orderDateTime(order.createdAt)}
              </TableCell>

              <TableCell className="text-center">{order.userEmail}</TableCell>

              <TableCell className="text-center">
                <Badge>{order.paymentStatus}</Badge>
              </TableCell>

              <TableCell className="text-center">
                <span className="font-semibold">&pound;</span>{" "}
                {order.totalAmount}
              </TableCell>

              <TableCell className="text-center">
                <Badge>{order.orderStatus}</Badge>
              </TableCell>

              <TableCell className="text-end">
                <div className="flex justify-end  items-center gap-tiny">
                  <Button variant="icon" className="px-2 hover:text-blue-500">
                    <SquarePen />
                  </Button>

                  <Button variant="icon" className="px-2 hover:text-red-500">
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default OrdersTable;
