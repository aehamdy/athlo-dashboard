import http from "@/api/http";
import type { Coupon } from "../types";
import { API_ENDPOINTS } from "@/api/endpoints";

export const couponsService = {
  getAll: async (): Promise<Coupon[]> => {
    const { data } = await http.get(API_ENDPOINTS.coupons.getAll);
    return data.data;
  },

  create: async (payload: FormData): Promise<Coupon> => {
    const { data } = await http.post(API_ENDPOINTS.coupons.create, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  },

  update: async (payload: FormData): Promise<Coupon> => {
    const { data } = await http.put(API_ENDPOINTS.coupons.update, payload, {
      headers: { "Content-Type": "mutltipart/form-data" },
    });

    return data;
  },

  delete: async (id: number): Promise<void> => {
    await http.delete(API_ENDPOINTS.coupons.delete(id));
  },
};
