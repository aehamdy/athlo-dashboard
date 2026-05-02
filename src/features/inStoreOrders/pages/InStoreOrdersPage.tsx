import { DataTable } from '@/components/data-table/DataTable';
import DashboardPageLayout from '@/components/shared/DashboardPageLayout';
import useFetchInStoreOrdersList from '../hooks/useFetchInStoreOrdersList';
import inStoreOrdersColumns from '../columns';
import { useMemo, useState } from 'react';
import type { InStoreOrderListItem } from '../types';
import ConfirmDeleteModal from '@/components/shared/ConfirmDeleteModal';
import useDeleteInStoreOrder from '../hooks/useDeleteInStoreOrder';

function InStoreOrdersPage() {
  const [orderToDelete, setOrderToDelete] =
    useState<InStoreOrderListItem | null>(null);

  const {
    data: inStoreOrders,
    isLoading,
    isError,
  } = useFetchInStoreOrdersList();

  const columns = useMemo(() => inStoreOrdersColumns(setOrderToDelete), []);

  const { ...mutation } = useDeleteInStoreOrder({ setOrderToDelete });

  const confirmDelete = () => {
    if (orderToDelete) {
      mutation.mutate(orderToDelete.id);
    }
  };

  return (
    <DashboardPageLayout title="In-Store Orders">
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={inStoreOrders ?? []}
          isLoading={isLoading}
          error={isError}
          columns={columns}
        />
      </div>

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
