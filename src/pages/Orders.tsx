import { useState } from "react";
import { API_ENDPOINTS } from "@/api/endPoints";
import AddOrderForm, {
  type AddOrderFormData,
} from "@/components/forms/AddOrderForm";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Order } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import TableHeadRow from "@/components/sharedComponents/TableHeadRow";
import TableWrapper from "@/components/sharedComponents/TableWrapper";
import { ORDER_TABLE_COLUMNS } from "@/config/tableColumns";

const initialValue = {
  fullName: "",
  city: "",
  country: "",
  region: "",
  streetAddress: "",
  buildingNumber: "",
  floorNumber: "",
  apartmentNumber: "",
  phoneNumber: "",
  notes: "",
};

function Orders() {
  const [formData, setFormData] = useState<AddOrderFormData>(initialValue);

  const { data, error, loading } = useFetchAll<Order[]>(
    API_ENDPOINTS.orders.getAll,
  );

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

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <Error title="Orders" message={message} />;
  }

  return (
    <DashboardSection
      title="Orders"
      buttonLabel="Add Order"
      description="Add a new order"
      formComponent={<AddOrderForm value={formData} onChange={setFormData} />}
    >
      <List variant="table">
        <TableWrapper>
          <Table className="rounded-md overflow-hidden">
            <TableCaption>A list of your recent invoices.</TableCaption>

            <TableHeadRow tableCols={ORDER_TABLE_COLUMNS} />

            {loading ? (
              <Loading
                variant="table"
                rowsCount={8}
                colsCount={ORDER_TABLE_COLUMNS.length}
              />
            ) : (
              data && (
                <TableBody>
                  {data.map((order) => (
                    <TableRow>
                      <TableCell className="font-semibold">
                        #{order.orderId}
                      </TableCell>

                      <TableCell className="text-center font-medium text-cyan-600">
                        {orderDateTime(order.createdAt)}
                      </TableCell>

                      <TableCell className="text-center">
                        {order.userEmail}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          className={`${
                            order.paymentStatus.toLowerCase() === "pending"
                              ? "text-yellow-600 bg-yellow-200"
                              : order.paymentStatus.toLowerCase() ===
                                  "completed"
                                ? "text-green-700 bg-green-200"
                                : order.paymentStatus.toLowerCase() === "failed"
                                  ? "text-red-600 bg-red-200"
                                  : ""
                          } rounded-sm`}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="font-semibold">&pound;</span>{" "}
                        {order.totalAmount}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          className={`${
                            order.orderStatus.toLowerCase() === "pending"
                              ? "text-yellow-600 bg-yellow-100 border-yellow-400"
                              : order.orderStatus.toLowerCase() === "shipped"
                                ? "text-purple-700 bg-purple-200 border-purple-400"
                                : order.orderStatus.toLowerCase() === "paid"
                                  ? "text-blue-700 bg-blue-200 border-blue-400"
                                  : order.orderStatus.toLowerCase() ===
                                      "completed"
                                    ? "text-green-700 bg-green-200 border-green-400"
                                    : order.orderStatus.toLowerCase() ===
                                        "cancelled"
                                      ? "text-red-800 bg-red-200 border-red-300"
                                      : ""
                          } border rounded-sm`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-end">
                        <div className="flex justify-end  items-center gap-tiny">
                          <Button
                            variant="icon"
                            className="px-2 hover:text-blue-500"
                          >
                            <SquarePen />
                          </Button>

                          <Button
                            variant="icon"
                            className="px-2 hover:text-red-500"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )
            )}
          </Table>
        </TableWrapper>
      </List>
    </DashboardSection>
  );
}

export default Orders;
