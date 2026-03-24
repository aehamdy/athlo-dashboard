import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { productService } from '../services/productsService';
import type { IProductReview } from '../types';
import { productKeys } from '../productKeys';

function useFetchProductRevviews(
  productId: number,
  options?: Pick<UseQueryOptions<IProductReview[]>, 'enabled'>,
) {
  return useQuery({
    queryKey: productKeys.reviews(productId),
    queryFn: () => productService.getProductReviews(productId),
    enabled: options?.enabled,
  });
}

export default useFetchProductRevviews;
