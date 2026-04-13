import http from '@/api/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from '../productKeys';
import { API_ENDPOINTS } from '@/api/endpoints';
import { toast } from 'sonner';
import parseApiError from '../utils/parseApiError';

function useDeleteProductVariant(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: number) =>
      http.delete(API_ENDPOINTS.products.deleteVariant(variantId)),

    onSuccess: (_data, variantId) => {
      queryClient.setQueryData(productKeys.media(productId), (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          variants: oldData.variants.filter((v: any) => v.id !== variantId),
        };
      });

      queryClient.setQueryData(
        productKeys.detail(productId),
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            variants: oldData.variants.filter((v: any) => v.id !== variantId),
          };
        },
      );

      toast.success('Variant deleted successfully');
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });
}

export default useDeleteProductVariant;
