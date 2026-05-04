import { useQuery } from '@tanstack/react-query';
import inStoreOrdersService from '../services/inStoreOrdersService';
import inStoreOrderKeys from '../inStoreOrderKeys';

function useFetchVariants(code: string) {
  return useQuery({
    queryKey: inStoreOrderKeys.variantsByCode(code),
    queryFn: () => inStoreOrdersService.getVariantsByCode(code),
    enabled: !!code,
  });
}

export default useFetchVariants;
