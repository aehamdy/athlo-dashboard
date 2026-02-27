import http from "@/api/http";
import type {
  PaginatedProductsResponse,
  GetProductsParams,
  ProductForm,
} from "../types";
import { API_ENDPOINTS } from "@/api/endpoints";

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

  getProductInfo: async (id: number) => {
    // Get product info without media and variants
    const product = await http.get(API_ENDPOINTS.products.getByIdToEdit(id));
    return product.data.data;
  },

  updateProductInfo: async (data: ProductForm) => {
    // Update only product info without media and variants
    const response = await http.put(API_ENDPOINTS.products.update, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    try {
      await http.delete<void>(API_ENDPOINTS.products.delete(id));
    } catch (error: unknown) {
      const axiosError = error as { response?: { data: unknown } };
      console.log("Delete error response:", axiosError.response?.data);
      throw error;
    }
  },
};
