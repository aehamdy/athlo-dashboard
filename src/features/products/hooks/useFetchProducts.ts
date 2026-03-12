import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productsService";
import type { GetProductsParams, PaginatedProductsResponse } from "../types";

function useFetchProducts(params: GetProductsParams = {}) {
  return useQuery<PaginatedProductsResponse>({
    queryKey: ["products-all", params],
    queryFn: () => productService.getPaginated(params),
  });
}

export default useFetchProducts;
