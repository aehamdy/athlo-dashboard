import { useQuery } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { couponKeys } from "../couponKeys";

type UseFetchApplicableProductsProps = {
  couponId: number;
  enabled: boolean;
  pageNumber?: number;
  pageSize?: number;
};

function useFetchApplicableProducts({
  couponId,
  enabled = false,
  pageNumber = 1,
  pageSize = 50,
}: UseFetchApplicableProductsProps) {
  return useQuery({
    queryKey: couponKeys.applicableProducts(couponId),
    queryFn: () => {
      if (!couponId) return [];
      return couponsService.getApplicableProducts({
        discountId: couponId,
        pageNumber,
        pageSize,
      });
    },
    enabled: enabled && !!couponId,
  });
}

export default useFetchApplicableProducts;
