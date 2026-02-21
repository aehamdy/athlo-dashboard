import { useState, useEffect } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableToolbar from "@/components/data-table/DataTableToolbar";
import { productColumns } from "@/features/products/components/columns";
import type { SortingState } from "@tanstack/react-table";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { Link } from "react-router-dom";
import Icon from "@/components/shared/Icon";
import { ROUTE_PATHS } from "@/routes/paths";

export default function ProductsPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search to avoid firing API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, error } = useProducts({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting,
    search: debouncedSearch,
  });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <DashboardPageLayout
      title="Products"
      action={
        <Link
          to={ROUTE_PATHS.dashboard.addProduct}
          className="main-link flex items-center gap-sm"
        >
          <Icon name="Plus" />
          New Product
        </Link>
      }
    >
      <div className="flex flex-col gap-base h-full">
        <DataTableToolbar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search products..."
        />

        <DataTable
          data={data?.data ?? []}
          columns={productColumns}
          isLoading={isLoading}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={data?.totalPages ?? 0}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
    </DashboardPageLayout>
  );
}
