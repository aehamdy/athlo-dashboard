import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productsService';
import { productKeys } from '../productKeys';

const useFetchProductMediaAndVariants = (id: number) => {
  return useQuery({
    queryKey: productKeys.media(id),
    queryFn: () => productService.getProductImagesAndVariants(id),
  });
};

export default useFetchProductMediaAndVariants;
