import { useQuery } from '@tanstack/react-query';
import inStoreOrdersService from '../services/inStoreOrdersService';
import inStoreOrderKeys from '../inStoreOrderKeys';

function useFetchInStoreOrder(id: number) {
  const query = useQuery({
    queryKey: inStoreOrderKeys.detail(id),
    queryFn: () => inStoreOrdersService.getById(id),
    enabled: !!id,
  });

  return query;
}

export default useFetchInStoreOrder;
