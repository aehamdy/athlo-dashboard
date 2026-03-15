import { API_ENDPOINTS } from "@/api/endpoints";
import http from "@/api/http";

const ordersService = {
  getAll: async () => {
    const response = await http.get(API_ENDPOINTS.orders.getAll);

    return response.data.data;
  },
  getCouponDetails: async (id: number) => {
    const response = await http.get(API_ENDPOINTS.orders.getById(id));
    return response.data.data;
  },
};

export default ordersService;
