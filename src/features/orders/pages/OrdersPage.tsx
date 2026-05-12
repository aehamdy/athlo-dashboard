import Error from '@/components/shared/Error';
import DashboardPageLayout from '@/components/shared/DashboardPageLayout';
import { DataTable } from '@/components/data-table/DataTable';
import useFetchAllOrders from '../hooks/useFetchAllOrders';
import ordersColumns from '../columns';
import type { Order } from '../types';
import { useMemo, useState } from 'react';
import DetailsPanel from '@/components/shared/DetailsPanel';
import OrderDetails from '../components/OrderDetails';
import type { PaginationState } from '@tanstack/react-table';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/constants/ui';
import useUpdateOrderStatus from '../hooks/useUpdateOrderStatus';
import useUpdatePaymentStatus from '../hooks/useUpdatePaymentStatus';

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE_OPTIONS[1],
  });

  const { data: orders, isLoading, isError } = useFetchAllOrders();

  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const { mutate: updatePaymentStatus } = useUpdatePaymentStatus();

  const columns = useMemo(
    () => ordersColumns(updateOrderStatus, updatePaymentStatus),
    [updateOrderStatus, updatePaymentStatus],
  );

  if (isError) {
    return <Error title="Orders" message="Failed to load orders" />;
  }

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardPageLayout title="E-Commerce Orders">
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={orders ?? []}
          isLoading={isLoading}
          error={isError}
          columns={columns}
          onRowClick={handleRowClick}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
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

export default OrdersPage;
