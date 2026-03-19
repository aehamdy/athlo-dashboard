import { API_ENDPOINTS } from '@/api/endpoints';
import http from '@/api/http';

const ordersService = {
  getAll: async () => {
    const response = await http.get(API_ENDPOINTS.orders.getAll);

    return response.data.data;
  },

  getCouponDetails: async (id: number) => {
    const response = await http.get(API_ENDPOINTS.orders.getById(id));
    return response.data.data;
  },

  updateOrderStatus: async (data: { orderId: number; status: number }) => {
    const response = await http.put(API_ENDPOINTS.orders.updateOrderStatus, {
      orderId: data.orderId,
      status: data.status,
    });
    return response.data.data;
  },

  updatePaymentStatus: async (data: { orderId: number; status: number }) => {
    const response = await http.put(API_ENDPOINTS.orders.updatePaymentStatus, {
      orderId: data.orderId,
      status: data.status,
    });
    return response.data.data;
  },
};

export default ordersService;
