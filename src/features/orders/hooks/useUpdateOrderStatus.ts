import { useMutation, useQueryClient } from '@tanstack/react-query';
import ordersService from '../services/ordersService';
import { toast } from 'sonner';
import orderKeys from '../orderKeys';

function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { orderId: number; status: number }) => {
      return ordersService.updateOrderStatus(data);
    },

    // optimistic update
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: orderKeys.all });

      const previous = queryClient.getQueryData(orderKeys.all);

      queryClient.setQueryData(orderKeys.all, (old: any[] = []) =>
        old.map((order) =>
          order.orderId === newData.orderId
            ? { ...order, orderStatus: newData.status }
            : order,
        ),
      );

      return { previous };
    },

    onSuccess: () => {
      toast.success('Order status updated successfully');
    },

    // rollback if failed
    onError: (_err: any, _newData, context) => {
      queryClient.setQueryData(orderKeys.all, context?.previous);

      const message =
        _err?.response?.data?.message ||
        JSON.stringify(_err?.response?.data) ||
        'Failed to update order status';

      toast.error(message);
    },

    // refetch to ensure sync with backend
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

export default useUpdateOrderStatus;
