import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateProductForm from "./forms/UpdateProductForm";
import type { Product } from "@/types";

type Props = {
  isUpdatingProduct: Product | null;
  setIsUpdatingProduct: (product: Product | null) => void;
};

function EditProductModal({ isUpdatingProduct, setIsUpdatingProduct }: Props) {
  return (
    <Dialog
      open={!!isUpdatingProduct}
      onOpenChange={(open) => {
        if (!open) {
          setIsUpdatingProduct(null);
        }
      }}
    >
      <DialogContent className="max-w-[390px] sm:max-w-[400px]">
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
  );
}

export default EditProductModal;
