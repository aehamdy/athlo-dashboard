import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productService } from "../services/productsService";
import type { ProductForm } from "../types";

type UpdateError = {
  response?: {
    data: {
      message?: string;
    };
  };
};

// Update only product info without media and variants
const useUpdateProductInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductForm) => {
      return productService.updateProductInfo(data);
    },

    onSuccess: (_, variables) => {
      toast.success(`${variables?.nameEn} updated successfully`);
      queryClient.invalidateQueries({
        queryKey: ["product", variables?.id, "info"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error: UpdateError) => {
      const message =
        error?.response?.data?.message || "Failed to update product";
      toast.error(message);
    },
  });
};

export default useUpdateProductInfo;
