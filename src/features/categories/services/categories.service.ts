import http from "@/api/http";
import type { Category } from "../types";
import { API_ENDPOINTS } from "@/api/endPoints";

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await http.get(API_ENDPOINTS.categories.getAll);
    return data.data;
  },

  create: async (payload: FormData): Promise<Category> => {
    const sleep = new Promise((resolve) => setTimeout(resolve, 3000));

    await sleep;

    const { data } = await http.post(API_ENDPOINTS.categories.create, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  update: async (payload: FormData): Promise<Category> => {
    const sleep = new Promise((resolve) => setTimeout(resolve, 3000));

    await sleep;
    const { data } = await http.put(
      `${API_ENDPOINTS.categories.update}`,
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await http.delete(API_ENDPOINTS.categories.delete(id));
  },
};
