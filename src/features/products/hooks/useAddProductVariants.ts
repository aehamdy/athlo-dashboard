import { useNavigate } from "react-router-dom";
import type { ProductVariantsFormType } from "../schemas";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";
import { ROUTE_PATHS } from "@/routes/paths";
import { transformVariants } from "../utils/transformVariants";

export function useAddProductVariants(productId: number) {
  const navigate = useNavigate();

  const submitVariants = async (data: ProductVariantsFormType) => {
    const transformedData = transformVariants(data.variants);

    await http.post(API_ENDPOINTS.products.addVariants, {
      productId,
      variants: transformedData,
    });

    navigate(ROUTE_PATHS.dashboard.products);
  };

  return { submitVariants };
}
