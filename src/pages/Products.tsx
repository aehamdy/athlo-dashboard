import { useState } from "react";
import AddProductForm from "@/components/forms/AddProductForm";
import ProductsTable from "@/components/ProductsTable";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import Loading from "@/components/sharedComponents/Loading";
import type { Product } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import UpdateProductForm from "@/components/forms/UpdateProductForm";
import { usePaginatedProducts } from "@/hooks/usePaginatedProducts";
import { AppPagination } from "@/components/sharedComponents/AppPagination";

function Products() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [isUpdatingProduct, setIsUpdatingProduct] = useState<Product | null>(
    null,
  );

  const { data, loading, error } = usePaginatedProducts(
    page,
    pageSize,
    search,
    ordering,
  );

  if (loading) return <Loading variant="table" />;
  if (error) return <Error title="Products" message={error} />;

  return (
    <DashboardSection
      title="Products"
      buttonLabel="Add Product"
      description="Add new products to your collection"
      formComponent={<AddProductForm />}
    >
      <List variant="table">
        {data && (
          <ProductsTable
            data={data?.items ?? []}
            setIsUpdatingProduct={setIsUpdatingProduct}
          />
        )}
      </List>

      {data && (
        <AppPagination
          currentPage={page}
          pageSize={data.pageSize}
          total={data.totalCount}
          onPageChange={setPage}
        />
      )}

      {isUpdatingProduct && (
        <UpdateProductForm
          product={isUpdatingProduct}
          onSuccess={() => setIsUpdatingProduct(null)}
        />
      )}

      {isUpdatingProduct && (
        <Dialog
          open={!!isUpdatingProduct}
          onOpenChange={(open) => {
            if (!open) {
              setIsUpdatingProduct(null);
            }
          }}
        >
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>
                Update{" "}
                <span className="text-accent">{isUpdatingProduct?.name}</span>
              </DialogTitle>

              <DialogDescription className="text-sm text-neutral-muted">
                Update the product details
              </DialogDescription>
            </DialogHeader>

            <UpdateProductForm
              product={isUpdatingProduct}
              onSuccess={() => setIsUpdatingProduct(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </DashboardSection>
  );
}

export default Products;
