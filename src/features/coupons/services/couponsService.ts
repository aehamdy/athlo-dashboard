import http from "@/api/http";
import type { Coupon, couponFormValue } from "../types";
import type { CouponFormValues } from "../coupons.schema";
import { API_ENDPOINTS } from "@/api/endpoints";

export const couponsService = {
  getAll: async (): Promise<Coupon[]> => {
    const { data } = await http.get(API_ENDPOINTS.coupons.getAll);
    return data.data;
  },

  getById: async (id: number): Promise<Coupon> => {
    const { data } = await http.get(API_ENDPOINTS.coupons.getById(id));
    return data.data;
  },

  create: async (payload: couponFormValue): Promise<Coupon> => {
    const { data } = await http.post(API_ENDPOINTS.coupons.create, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return data;
  },

  update: async (
    payload: CouponFormValues & { id: number },
  ): Promise<Coupon> => {
    const { data } = await http.put(API_ENDPOINTS.coupons.update, payload);

    return data;
  },

  delete: async (id: number): Promise<void> => {
    await http.delete(API_ENDPOINTS.coupons.delete(id));
  },

  // Applicable Products
  getApplicableProducts: async (discountId: number) => {
    const response = await http.get(
      API_ENDPOINTS.coupons.getApplicableProducts,
      {
        params: { DiscountId: discountId, pageNumber: 1, pageSize: 50 },
      },
    );

    console.log("API response:", response.data);
    return response.data.data;
  },
};
