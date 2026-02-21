import http from "@/api/http";
import type { PaginatedProductsResponse, GetProductsParams } from "../types";
import { API_ENDPOINTS } from "@/api/endPoints";

export const productService = {
  getPaginated: async ({
    pageIndex,
    pageSize,
    sorting,
    search,
  }: GetProductsParams) => {
    const sort = sorting?.[0];

    const response = await http.get<PaginatedProductsResponse>(
      API_ENDPOINTS.products.paginated(
        pageIndex + 1,
        pageSize,
        search,
        sort ? `${sort.desc ? "-" : ""}${sort.id}` : undefined,
      ),
    );

    return response.data;
  },
};
