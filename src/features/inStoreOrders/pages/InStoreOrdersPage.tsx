import { DataTable } from '@/components/data-table/DataTable';
import DashboardPageLayout from '@/components/shared/DashboardPageLayout';
import useFetchInStoreOrdersList from '../hooks/useFetchInStoreOrdersList';
import inStoreOrdersColumns from '../columns';
import { useMemo, useState } from 'react';
import { type InStoreOrderListItem } from '../types';
import ConfirmDeleteModal from '@/components/shared/ConfirmDeleteModal';
import useDeleteInStoreOrder from '../hooks/useDeleteInStoreOrder';
import DetailsPanel from '@/components/shared/DetailsPanel';
import InStoreOrderDetails from '../components/InStoreOrderDetails';

function InStoreOrdersPage() {
  const [selectedOrder, setSelectedOrder] =
    useState<InStoreOrderListItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] =
    useState<InStoreOrderListItem | null>(null);

  const {
    data: inStoreOrders,
    isLoading,
    isError,
  } = useFetchInStoreOrdersList();

  const columns = useMemo(() => inStoreOrdersColumns({ setOrderToDelete }), []);

  const { ...mutation } = useDeleteInStoreOrder({ setOrderToDelete });

  const confirmDelete = () => {
    if (orderToDelete) {
      mutation.mutate(orderToDelete.id);
    }
  };

  const handleRowClick = (order: InStoreOrderListItem) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardPageLayout title="In-Store Orders">
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={inStoreOrders ?? []}
          isLoading={isLoading}
          error={isError}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedOrder && (
        <DetailsPanel
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          title="In-Store Order Details"
          description="View order details"
          width="min-w-[95%] md:min-w-1/2 lg:min-w-1/3"
        >
          <InStoreOrderDetails orderId={selectedOrder.id} />
        </DetailsPanel>
      )}

      <ConfirmDeleteModal
        item={orderToDelete}
        setItem={setOrderToDelete}
        itemLabel="order"
        getDisplayName={(o) => o?.saleNumber ?? ''}
        onConfirm={confirmDelete}
        isPending={mutation.isPending}
      />
    </DashboardPageLayout>
  );
}

export default InStoreOrdersPage;
