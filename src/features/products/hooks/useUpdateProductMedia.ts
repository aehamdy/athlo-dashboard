import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productsService";
import { toast } from "sonner";
import parseApiError from "../utils/parseApiError";

function useUpdateProductMedia(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      productService.updateProductMedia(formData),

    onSuccess: () => {
      toast.success("Image replaced successfully.");
      // Refetch product media after update
      queryClient.invalidateQueries({
        queryKey: ["product-media", productId],
      });

      // Invalidate main product info
      queryClient.invalidateQueries({
        queryKey: ["product-info", productId],
      });
    },

    onError: (error) => {
      const message = parseApiError(error);
      toast.error(message);
    },
  });
}

export default useUpdateProductMedia;
