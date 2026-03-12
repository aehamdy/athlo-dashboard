import { useQuery } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { couponKeys } from "../couponKeys";

function useFetchAllCoupons() {
  return useQuery({
    queryKey: couponKeys.list(),
    queryFn: () => couponsService.getAll(),
  });
}

export default useFetchAllCoupons;
