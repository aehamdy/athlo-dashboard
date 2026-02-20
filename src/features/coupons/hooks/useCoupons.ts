import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/coupons.service";

export const couponKeys = {
  all: ["coupons"] as const,
};

export function useCoupons() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: couponKeys.all,
    queryFn: () => couponsService.getAll(),
  });

  const createCoupon = useMutation({
    mutationFn: couponsService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
    },
  });

  const updateCoupon = useMutation({
    mutationFn: couponsService.update,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
    },
  });

  const deleteCoupon = useMutation({
    mutationFn: couponsService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
    },
  });

  return { ...query, createCoupon, updateCoupon, deleteCoupon };
}
