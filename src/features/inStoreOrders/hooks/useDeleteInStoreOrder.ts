import { useMutation, useQueryClient } from '@tanstack/react-query';
import inStoreOrdersService from '../services/inStoreOrdersService';
import inStoreOrderKeys from '../inStoreOrderKeys';
import { toast } from 'sonner';
import type { Dispatch, SetStateAction } from 'react';
import type { InStoreOrderListItem } from '../types';

type Props = {
  setOrderToDelete: Dispatch<SetStateAction<InStoreOrderListItem | null>>;
};

function useDeleteInStoreOrder({ setOrderToDelete }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => inStoreOrdersService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: inStoreOrderKeys.all });
      toast.success('Order deleted successfully');
      setOrderToDelete(null);
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to delete the order');
    },
  });

  return mutation;
}

export default useDeleteInStoreOrder;
