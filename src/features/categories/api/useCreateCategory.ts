import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";
import type { Category } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Category) => {
      const res = await http.post(API_ENDPOINTS.categories.create, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
