import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { GetProductsParams, PaginatedProductsResponse } from "../types";
import { productService } from "../services/products.service";

export function useProducts(params: GetProductsParams) {
  return useQuery<PaginatedProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => productService.getPaginated(params),
    placeholderData: keepPreviousData,
  });
}
