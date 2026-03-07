import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { toast } from "sonner";
import { couponKeys } from "./couponKeys";

function useDeleteCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponsService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
      toast.success("Coupon deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete coupon. Please try again!");
    },
  });
}

export default useDeleteCoupon;
