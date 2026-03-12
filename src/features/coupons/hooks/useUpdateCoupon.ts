import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { toast } from "sonner";
import { couponKeys } from "../couponKeys";
import type { CouponFormValues } from "../coupons.schema";

function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CouponFormValues & { id: number }) =>
      couponsService.update(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });

      toast.success("Coupon updated successfully");
    },

    onError: () => {
      toast.error("Failed to update coupon. Please try again.");
    },
  });
}

export default useUpdateCoupon;
