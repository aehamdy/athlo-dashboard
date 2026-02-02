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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Products() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  if (loading) return <Loading variant="table" />;
  if (error) return <Error title="Products" message={error} />;

  return (
    <DashboardSection
      title="Products"
      buttonLabel="Add Product"
      description="Add new products to your collection"
      formComponent={<AddProductForm />}
    >
      <div className="flex justify-between items-center">
        <div className="w-1/2 md:w-2/5 lg:w-1/4">
          <Input
            type="search"
            placeholder="Search"
            className="form-input w-full"
            onKeyDown={handleSearch}
          />
        </div>

        <div>
          <Select onValueChange={(value) => setOrdering(value)}>
            <SelectTrigger className="form-input w-full max-w-48">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Adcending order by</SelectLabel>
                <SelectItem value="6">Price</SelectItem>
                <SelectItem value="2">Name</SelectItem>
                <SelectItem value="4">Season</SelectItem>
                <SelectItem value="8">Category</SelectItem>
                <SelectItem value="5">Club</SelectItem>
                <SelectItem value="7">Brand</SelectItem>
                {/* <SelectItem value="0">Id</SelectItem> */}
                {/* <SelectItem value="1">Code</SelectItem> */}
                {/* <SelectItem value="3">Description</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-tiny md:space-y-md lg:space-y-6xl">
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
      </div>

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
