import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productsService';
import type { ProductVariant } from '../types';
import { productKeys } from '../productKeys';
import { toast } from 'sonner';

function useUpdateProductVariant(productId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductVariant) => productService.updateVariant(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });

      toast.success('Variant updated successfully');

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update variant');
    },
  });
}

export default useUpdateProductVariant;
