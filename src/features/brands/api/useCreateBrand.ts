import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Brand } from "@/types";

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Brand) => {
      const res = await http.post(API_ENDPOINTS.brands.create, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
