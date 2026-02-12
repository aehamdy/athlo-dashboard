import { useState } from "react";
import AddProductForm from "@/features/products/components/forms/AddProductForm";
import DashboardSection from "@/components/shared/DashboardSection";
import Error from "@/components/shared/Error";
import List from "@/components/shared/List";
import Loading from "@/components/shared/Loading";
import type { Product } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import UpdateProductForm from "@/features/products/components/forms/UpdateProductForm";
import useFetchPaginatedData from "@/hooks/useFetchPaginatedData";
import { AppPagination } from "@/components/shared/AppPagination";
import { API_ENDPOINTS } from "@/api/endPoints";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import http from "@/api/http";
import TableWrapper from "@/components/shared/TableWrapper";
import TableHeadRow from "@/components/shared/TableHeadRow";
import { PRODUCT_TABLE_COLUMNS } from "@/config/tableColumns";

type OrderProductsBy = {
  id: number;
  label: string;
  value: number;
};

const orderProductsBy: OrderProductsBy[] = [
  {
    id: 1,
    label: "Price",
    value: 6,
  },
  {
    id: 2,
    label: "Name",
    value: 2,
  },
  {
    id: 3,
    label: "Season",
    value: 4,
  },
  {
    id: 4,
    label: "Category",
    value: 8,
  },
  {
    id: 5,
    label: "Club",
    value: 5,
  },
  {
    id: 6,
    label: "Brand",
    value: 7,
  },
  // {
  //   id: 7,
  //   label: "ID",
  //   value: 0,
  // },
  // {
  //   id: 8,
  //   label: "Code",
  //   value: 1,
  // },
  // {
  //   id: 9,
  //   label: "Description",
  //   value: 3,
  // },
];

function Products() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [isUpdatingProduct, setIsUpdatingProduct] = useState<Product | null>(
    null,
  );

  const { data, loading, error } = useFetchPaginatedData<Product>(
    API_ENDPOINTS.products.paginated,
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

  const handleOnUpdate = (product: Product) => {
    setIsUpdatingProduct(product);
  };

  const handleProductDelete = (id: number) => {
    http.delete(API_ENDPOINTS.products.delete(id));
  };

  if (error) return <Error title="Products" message={error} />;

  return (
    <DashboardSection
      title="Products"
      buttonLabel="Add Product"
      description="Add new products to your collection"
      formComponent={<AddProductForm />}
    >
      <div className="flex justify-between items-center mt-1">
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
                {orderProductsBy.map((item) => (
                  <SelectItem key={item.id} value={item.value.toString()}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <List variant="table">
          <TableWrapper>
            <Table className="rounded-md overflow-hidden">
              <TableCaption>A list of your recent products.</TableCaption>

              <TableHeadRow tableCols={PRODUCT_TABLE_COLUMNS} />

              {loading ? (
                <Loading
                  variant="table"
                  rowsCount={pageSize}
                  colsCount={PRODUCT_TABLE_COLUMNS.length}
                />
              ) : (
                data && (
                  <TableBody>
                    {data?.items?.map((product) => (
                      <TableRow key={product.id} className="text-center">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-sm">
                            <div className="w-14 h-14 overflow-hidden rounded-sm">
                              <img
                                src={product.images[0]}
                                // alt={product.name}
                                alt={product.code}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="">{product.name}</div>
                          </div>
                        </TableCell>

                        <TableCell>{product.categoryName}</TableCell>

                        <TableCell>{product.brandName}</TableCell>

                        <TableCell>{product.season}</TableCell>

                        <TableCell>{product.club}</TableCell>

                        <TableCell className="">
                          <span className="font-semibold">&pound;</span>{" "}
                          {product.basePrice}
                        </TableCell>

                        <TableCell>
                          {product.priceAfterDiscount < product.basePrice ? (
                            <div className="flex justify-center items-center gap-tiny font-semibold text-red-500">
                              <span>&pound;</span> {product.priceAfterDiscount}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>

                        <TableCell className="">
                          <div className="flex justify-end items-center gap-tiny">
                            <Button
                              variant="icon"
                              onClick={() => handleOnUpdate(product)}
                              className="px-2 hover:text-blue-500"
                            >
                              <SquarePen />
                            </Button>

                            <Button
                              variant="icon"
                              onClick={() => handleProductDelete(product.id)}
                              className="px-2 hover:text-red-500"
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )
              )}
            </Table>
          </TableWrapper>
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
