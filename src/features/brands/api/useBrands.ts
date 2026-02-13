import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";
import type { Brand } from "@/types";

const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await http.get(API_ENDPOINTS.brands.getAll);
      return res.data.data as Brand[];
    },
  });
};

export default useBrands;
