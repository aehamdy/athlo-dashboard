import { useState } from "react";
import type { Product } from "../types";

type DeleteMutation = {
  mutate: (id: number, options?: { onSuccess?: () => void }) => void;
  status: "idle" | "pending" | "success" | "error";
};

export function useProductDelete(deleteMutation: DeleteMutation) {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const openDelete = (product: Product) => {
    setProductToDelete(product);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;

    deleteMutation.mutate(productToDelete.id, {
      onSuccess: () => setProductToDelete(null),
    });
  };

  return {
    productToDelete,
    setProductToDelete,
    openDelete,
    confirmDelete,
  };
}
