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
    const { data } = await http.post(API_ENDPOINTS.coupons.create, payload);

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

  getApplicableProducts: async ({
    discountId,
    pageNumber = 1,
    pageSize = 50,
  }: {
    discountId: number;
    pageNumber?: number;
    pageSize?: number;
  }) => {
    const response = await http.get(
      API_ENDPOINTS.coupons.getApplicableProducts,
      {
        params: {
          DiscountId: discountId,
          PageNumber: pageNumber,
          PageSize: pageSize,
        },
      },
    );

    return response.data.data;
  },

  addProductsToCoupon: (payload: {
    discountId: number;
    productIds: number[];
  }) => {
    return http.post(API_ENDPOINTS.coupons.addApplicableProduct, payload);
  },

  removeAllApplicableProducts: (payload: {
    discountId: number;
    productIds: number[];
  }) => {
    return http.delete(API_ENDPOINTS.coupons.deleteAllApplicableProducts, {
      data: payload,
    });
  },
};
