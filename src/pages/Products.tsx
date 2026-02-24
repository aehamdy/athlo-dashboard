import { useState, useEffect } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableToolbar from "@/components/data-table/DataTableToolbar";
import { productColumns } from "@/features/products/columns";
import type { SortingState } from "@tanstack/react-table";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { Link } from "react-router-dom";
import Icon from "@/components/shared/Icon";
import { ROUTE_PATHS } from "@/routes/paths";
import type { Product } from "@/features/products/types";
import ConfirmDeleteModal from "@/features/products/components/ConfirmDeleteModal";

export default function ProductsPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Debounce search to avoid firing API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data: products,
    isLoading,
    error,
    deleteProduct,
  } = useProducts({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting,
    search: debouncedSearch,
  });

  const handleProductDelete = (id: number) => {
    const product = products?.data.find((product) => product.id === id);
    if (product) setProductToDelete(product);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    deleteProduct.mutate(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null);
      },
    });
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const columns = productColumns((id) => {
    handleProductDelete(id);
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
          data={products?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={products?.totalPages ?? 0}
          sorting={sorting}
          onSortingChange={setSorting}
        />

        <ConfirmDeleteModal<Product>
          item={productToDelete}
          setItem={setProductToDelete}
          itemLabel="product"
          getDisplayName={(product) => product.name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isPending={deleteProduct.status === "pending"}
        />
      </div>
    </DashboardPageLayout>
  );
}
