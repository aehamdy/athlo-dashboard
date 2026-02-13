import { useQuery } from "@tanstack/react-query";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endPoints";
import type { Category } from "@/types";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await http.get(API_ENDPOINTS.categories.getAll);
      return res.data.data as Category[];
    },
  });
};
