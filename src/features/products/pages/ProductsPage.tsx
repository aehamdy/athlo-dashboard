import useFetchPaginatedProducts from "@/features/products/hooks/useFetchPaginatedProducts";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableToolbar from "@/components/data-table/DataTableToolbar";
import { productColumns } from "@/features/products/columns";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { Link } from "react-router-dom";
import Icon from "@/components/shared/Icon";
import { ROUTE_PATHS } from "@/routes/paths";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import { PRODUCT_PAGE_SIZE_OPTIONS } from "@/features/products/constants";
import { useDebounce } from "@/features/products/hooks/useDebounce";
import { useProductsTable } from "@/features/products/hooks/useProductsTable";
import { useProductDelete } from "@/features/products/hooks/useProductDelete";
import { useState } from "react";
import type { Product } from "../types";
import DetailsPanel from "@/components/shared/DetailsPanel";
import ProductDetails from "../components/ProductDetails";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { pagination, setPagination, sorting, setSorting, search, setSearch } =
    useProductsTable();

  const debouncedSearch = useDebounce(search);

  const {
    data: products,
    isLoading,
    error,
    deleteProduct,
  } = useFetchPaginatedProducts({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting,
    search: debouncedSearch,
  });

  const { productToDelete, setProductToDelete, openDelete, confirmDelete } =
    useProductDelete(deleteProduct);

  const columns = productColumns((id) => {
    const product = products?.data.find((p) => p.id === id);
    if (product) openDelete(product);
  });

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
  };

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
        <div className="md:w-1/4">
          <DataTableToolbar
            search={search}
            onSearchChange={setSearch}
            placeholder="Search products..."
          />
        </div>

        <DataTable
          data={products?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={products?.totalPages ?? 0}
          sorting={sorting}
          onSortingChange={setSorting}
          pageSizeOptions={PRODUCT_PAGE_SIZE_OPTIONS}
          error={error}
          onRowClick={handleRowClick}
        />

        <ConfirmDeleteModal
          item={productToDelete}
          setItem={setProductToDelete}
          itemLabel="product"
          getDisplayName={(p) => p?.name ?? ""}
          onConfirm={confirmDelete}
          isPending={deleteProduct.status === "pending"}
        />

        {selectedProduct && (
          <DetailsPanel
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            title="Product Details"
            description="Explore the full product details."
          >
            <ProductDetails product={selectedProduct} />
          </DetailsPanel>
        )}
      </div>
    </DashboardPageLayout>
  );
}
