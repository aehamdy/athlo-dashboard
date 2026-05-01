import { useQuery } from '@tanstack/react-query';
import inStoreOrderKeys from '../inStoreOrderKeys';
import inStoreOrdersService from '../services/inStoreOrdersService';

const useFetchInStoreOrdersList = () => {
  const query = useQuery({
    queryKey: inStoreOrderKeys.all,
    queryFn: () => inStoreOrdersService.getAll(),
  });

  return { ...query };
};

export default useFetchInStoreOrdersList;
