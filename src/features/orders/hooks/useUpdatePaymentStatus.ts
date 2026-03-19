import { useMutation, useQueryClient } from '@tanstack/react-query';
import ordersService from '../services/ordersService';
import { toast } from 'sonner';
import orderKeys from '../orderKeys';

function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { orderId: number; status: number }) => {
      return ordersService.updatePaymentStatus(data);
    },

    onSuccess: () => {
      toast.success('Payment status updated successfully');
    },

    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        JSON.stringify(err?.response?.data) ||
        'Failed to update payment status';
      toast.error(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

export default useUpdatePaymentStatus;
