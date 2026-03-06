import Error from "@/components/shared/Error";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { DataTable } from "@/components/data-table/DataTable";
import useFetchAllOrders from "../hooks/useFetchAllOrders";
import ordersColumns from "../columns";

function Orders() {
  const { data: orders, isLoading, isError } = useFetchAllOrders();

  if (isError) {
    return <Error title="Orders" message="Failed to load orders" />;
  }

  return (
    <DashboardPageLayout title="Orders">
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={orders ?? []}
          isLoading={isLoading}
          error={isError}
          columns={ordersColumns()}
        />
      </div>
    </DashboardPageLayout>
  );
}

export default Orders;
