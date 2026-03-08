import { useQuery } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { couponKeys } from "./couponKeys";

function useFetchCoupon(couponId: number) {
  return useQuery({
    queryKey: couponKeys.detail(couponId),
    queryFn: () => couponsService.getById(couponId),
    enabled: !!couponId,
  });
}

export default useFetchCoupon;
