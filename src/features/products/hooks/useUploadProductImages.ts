import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductImagesFormType } from "../products.schema";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";

type UploadPayload = {
  productId: number;
  data: ProductImagesFormType;
};

export function useUploadProductImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["upload-product-images"],

    mutationFn: async ({ productId, data }: UploadPayload) => {
      const formData = new FormData();

      formData.append("productId", productId.toString());

      data.images.forEach((img) => {
        formData.append("Images", img);
      });

      await http.post(API_ENDPOINTS.products.addImages, formData);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
