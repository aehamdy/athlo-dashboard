import AppImage from "@/components/shared/AppImage";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useFetchProducts from "@/features/products/hooks/useFetchProducts";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import useAddProductsToCoupon from "../hooks/useAddProductsToCoupon";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponId: number;
}

function ProductPickerDialog({
  open,
  onOpenChange,
  couponId,
}: ProductPickerDialogProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedProducts([]);
      setSearchTerm("");
      setDebouncedSearch("");
    }
    onOpenChange(newOpen);
  };

  const { data: products, isLoading } = useFetchProducts({
    search: debouncedSearch,
    pageSize: 100,
  });

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const addProductsMutation = useAddProductsToCoupon();

  const handleAddProducts = () => {
    addProductsMutation.mutate(
      {
        discountId: couponId,
        productIds: selectedProducts,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select Products</DialogTitle>
          <DialogDescription className="text-xs">
            Select the products you want to add to the coupon.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-sm">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />

          {isLoading ? (
            <ul className="space-y-sm">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <Skeleton className="w-full h-12 bg-gray-200 rounded-md" />
                  </li>
                ))}
            </ul>
          ) : (
            <div className="max-h-[300px] space-y-2 p-tiny border rounded-md overflow-y-auto">
              {products?.data.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No products found
                </div>
              ) : (
                <ul className="space-y-sm">
                  {products?.data.map((product) => (
                    <li key={product.id} className="rounded-md overflow-hidden">
                      <label className="flex items-center gap-regular p-sm bg-gray-100 cursor-pointer">
                        <Checkbox
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                          className="data-[state=checked]:text-dark data-[state=checked]:bg-accent data-[state=checked]:border-transparent cursor-pointer"
                        />

                        <div className="w-10 h-10 rounded-md overflow-hidden">
                          <AppImage
                            src={product.images[0]}
                            alt={`${product.name} image`}
                          />
                        </div>

                        <span>{product.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-sm mt-sm">
          <Button
            onClick={handleAddProducts}
            disabled={
              addProductsMutation.isPending || selectedProducts.length === 0
            }
            className="w-full"
          >
            {addProductsMutation.isPending ? (
              <div className="flex items-center gap-sm">
                <Loading /> Adding...
              </div>
            ) : (
              "Add Selected Products"
            )}
          </Button>

          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductPickerDialog;
