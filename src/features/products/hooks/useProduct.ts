import { useQuery } from "@tanstack/react-query";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Product } from "@/types";

export const useProduct = (id: number | null) => {
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await http.get(
        API_ENDPOINTS.products.getById(id.toString()),
      );
      return response.data.data as Product;
    },
    enabled: !!id,
  });

  return { product: data, basePrice: data?.basePrice ?? 0 };
};
