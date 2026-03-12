import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponsService } from "../services/couponsService";
import { couponKeys } from "../couponKeys";
import { toast } from "sonner";

function useRemoveAllApplicableProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponsService.removeAllApplicableProducts,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: couponKeys.applicableProducts(variables.discountId),
      });

      toast.success("All applicable products removed successfully");
    },

    onError: (error) => {
      const message =
        error?.message || "Failed to remove all applicable products";
      toast.error(message);
    },
  });
}

export default useRemoveAllApplicableProducts;
