import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { productService } from '../services/productsService';
import type { ProductForm } from '../types';
import { productKeys } from '../productKeys';

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
        queryKey: productKeys.info(variables?.id),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.all(),
      });
    },

    onError: (error: UpdateError) => {
      const message =
        error?.response?.data?.message || 'Failed to update product';
      toast.error(message);
    },
  });
};

export default useUpdateProductInfo;
