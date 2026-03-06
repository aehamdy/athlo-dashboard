import Error from "@/components/shared/Error";
import useFetchPaginatedUsers from "../hooks/useFetchPaginatedUsers";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { DataTable } from "@/components/data-table/DataTable";
import usersColumns from "../columns";
import { useState } from "react";

function Users() {
  const [pageNumber] = useState(1);
  const [pageSize] = useState(8);
  const {
    data: users,
    isLoading,
    isError,
  } = useFetchPaginatedUsers(pageNumber, pageSize);

  if (isError) return <Error title="Users" message="Failed to load users" />;

  return (
    <DashboardPageLayout title="Users">
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={users ?? []}
          isLoading={isLoading}
          error={isError}
          columns={usersColumns()}
          // pagination={pagination}
          // onPaginationChange={setPagination}
          // pageCount={products?.totalPages ?? 0}
          // sorting={sorting}
          // onSortingChange={setSorting}
          // pageSizeOptions={PRODUCT_PAGE_SIZE_OPTIONS}
          // onRowClick={handleRowClick}
        />
      </div>
    </DashboardPageLayout>
  );
}

export default Users;
