import { DataTable } from '@/components/data-table/DataTable';
import DashboardPageLayout from '@/components/shared/DashboardPageLayout';
import useFetchInStoreOrdersList from '../hooks/useFetchInStoreOrdersList';
import inStoreOrdersColumns from '../columns';

function InStoreOrdersPage() {
  const {
    data: inStoreOrders,
    isLoading,
    isError,
  } = useFetchInStoreOrdersList();

  const columns = inStoreOrdersColumns();

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
    </DashboardPageLayout>
  );
}

export default InStoreOrdersPage;
