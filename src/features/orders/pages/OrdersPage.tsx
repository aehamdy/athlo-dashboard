import Error from "@/components/shared/Error";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { DataTable } from "@/components/data-table/DataTable";
import useFetchAllOrders from "../hooks/useFetchAllOrders";
import ordersColumns from "../columns";
import type { Order } from "../types";
import { useState } from "react";
import DetailsPanel from "@/components/shared/DetailsPanel";
import OrderDetails from "../components/OrderDetails";

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { data: orders, isLoading, isError } = useFetchAllOrders();

  if (isError) {
    return <Error title="Orders" message="Failed to load orders" />;
  }

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardPageLayout title="Orders">
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={orders ?? []}
          isLoading={isLoading}
          error={isError}
          columns={ordersColumns()}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedOrder && (
        <DetailsPanel
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          title="Order Details"
          description="View and manage order details"
          width="min-w-[95%] md:min-w-1/2 lg:min-w-1/3"
        >
          <OrderDetails orderId={selectedOrder.orderId} />
        </DetailsPanel>
      )}
    </DashboardPageLayout>
  );
}

export default Orders;
