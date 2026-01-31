import { useState } from "react";
import { API_ENDPOINTS } from "@/api/endPoints";
import AddProductForm from "@/components/forms/AddProductForm";
import ProductsTable from "@/components/ProductsTable";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import UpdateProductForm from "@/components/forms/UpdateProductForm";

function Products() {
  const [isUpdatingProduct, setIsUpdatingProduct] = useState<Product | null>(
    null,
  );
  const { data, error, loading } = useFetchAll<Product[]>(
    API_ENDPOINTS.products.getAll,
  );

  if (loading) return <Loading size="xl" />;

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <Error title="Products" message={errorMessage} />;
  }

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
            data={data}
            setIsUpdatingProduct={setIsUpdatingProduct}
          />
        )}
      </List>

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
