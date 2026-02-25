import { API_ENDPOINTS } from "@/api/endpoints";
import type { Brand } from "../types";
import http from "@/api/http";

export const brandsService = {
  getAll: async (): Promise<Brand[]> => {
    const { data } = await http.get(API_ENDPOINTS.brands.getAll);

    return data.data;
  },

  create: async (payload: FormData): Promise<Brand> => {
    const { data } = await http.post(API_ENDPOINTS.brands.create, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  update: async (payload: FormData): Promise<Brand> => {
    const { data } = await http.put(`${API_ENDPOINTS.brands.update}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await http.delete(API_ENDPOINTS.brands.delete(id));
  },
};
