import { useQuery } from '@tanstack/react-query';
import http from '@/api/http';
import { API_ENDPOINTS } from '@/api/endpoints';
import type { ProductDetails } from '../types';
import { productKeys } from '../productKeys';

export const useFetchProductById = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const response = await http.get(API_ENDPOINTS.products.getById(id));
      return response.data.data as ProductDetails;
    },
    enabled: !!id,
  });
};
