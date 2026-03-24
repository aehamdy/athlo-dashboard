import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productsService';
import type { Product } from '../types';
import { productKeys } from '../productKeys';

const useFetchProductInfo = (id: number) => {
  return useQuery<Product>({
    queryKey: productKeys.info(id),
    queryFn: () => productService.getProductInfo(id),
    enabled: !!id,
  });
};

export default useFetchProductInfo;
