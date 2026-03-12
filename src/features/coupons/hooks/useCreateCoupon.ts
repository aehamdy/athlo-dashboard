import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { toast } from "sonner";
import { couponKeys } from "../couponKeys";
import type { CouponFormValues } from "../coupons.schema";

function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CouponFormValues) => {
      const startDateISO = new Date(
        data.startDate.setHours(
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds(),
        ),
      ).toISOString();

      const endDateISO = new Date(
        data.endDate.setHours(
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds(),
        ),
      ).toISOString();

      const payload = {
        code: data.code,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        percentage: data.percentage,
        type: data.type,
        startDate: startDateISO,
        endDate: endDateISO,
      };

      return couponsService.create(payload);
    },

    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
      toast.success(`Coupon "${data.code}" created successfully`);

      queryClient.setQueryData(
        couponKeys.all,
        (oldData: CouponFormValues[] | undefined) => {
          if (!oldData) return [data];
          return [...oldData, data];
        },
      );
    },

    onError: () => {
      toast.error("Failed to create coupon. Please try again.");
    },
  });
}

export default useCreateCoupon;
