import http from '@/api/http';
import type {
  PaginatedProductsResponse,
  GetProductsParams,
  ProductForm,
  ProductVariant,
} from '../types';
import { API_ENDPOINTS } from '@/api/endpoints';

export const productService = {
  getPaginated: async ({
    pageIndex,
    pageSize,
    sorting,
    search,
  }: GetProductsParams = {}) => {
    const sort = sorting?.[0];

    const url = API_ENDPOINTS.products.paginated(
      pageIndex !== undefined ? pageIndex + 1 : undefined,
      pageSize,
      search?.trim() ? search : undefined,
      sort ? `${sort.desc ? '-' : ''}${sort.id}` : undefined,
    );

    const response = await http.get<PaginatedProductsResponse>(url);

    return response.data;
  },

  getProductInfo: async (id: number) => {
    // Get product info without media and variants
    const product = await http.get(API_ENDPOINTS.products.getByIdToEdit(id));
    return product.data.data;
  },

  getProductImagesAndVariants: async (id: number) => {
    // Get product images and variants
    const product = await http.get(
      API_ENDPOINTS.products.getProductWithVariants(id),
    );
    return product.data.data;
  },

  updateProductInfo: async (data: ProductForm) => {
    // Update only product info without media and variants
    const response = await http.put(API_ENDPOINTS.products.update, data);
    return response.data;
  },

  updateProductMedia: async (
    formData: FormData,
  ): Promise<{ images: string[] }> => {
    const response = await http.put(
      API_ENDPOINTS.products.updateImages,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    try {
      await http.delete<void>(API_ENDPOINTS.products.delete(id));
    } catch (error: unknown) {
      const axiosError = error as { response?: { data: unknown } };
      console.log('Delete error response:', axiosError.response?.data);
      throw error;
    }
  },

  getVariants: async (productId: number) => {
    const response = await http.get(
      API_ENDPOINTS.products.getVariantsToEdit(productId),
    );
    return response.data.data;
  },

  updateVariant: (data: ProductVariant) =>
    http.put(API_ENDPOINTS.products.updateVariant, data),

  deleteVariant: async (variantId: number): Promise<void> => {
    try {
      await http.delete<void>(API_ENDPOINTS.products.deleteVariant(variantId));
    } catch (error: unknown) {
      const axiosError = error as { response?: { data: unknown } };
      console.log('Delete error response:', axiosError.response?.data);
      throw error;
    }
  },

  getProductReviews: async (productId: number) => {
    const response = await http.get(
      API_ENDPOINTS.orderReviews.getById(productId),
    );
    return response.data.data;
  },
};
