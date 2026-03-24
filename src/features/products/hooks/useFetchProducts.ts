import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productsService';
import type { GetProductsParams, PaginatedProductsResponse } from '../types';
import { productKeys } from '../productKeys';

function useFetchProducts(params: GetProductsParams = {}) {
  return useQuery<PaginatedProductsResponse>({
    queryKey: productKeys.all(params),
    queryFn: () => productService.getPaginated(params),
  });
}

export default useFetchProducts;
