import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { couponKeys } from "../couponKeys";

function useAddProductsToCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { discountId: number; productIds: number[] }) =>
      couponsService.addProductsToCoupon(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: couponKeys.applicableProducts(variables.discountId),
      });
    },
  });
}

export default useAddProductsToCoupon;
