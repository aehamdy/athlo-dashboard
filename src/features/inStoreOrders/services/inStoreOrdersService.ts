import { API_ENDPOINTS } from '@/api/endpoints';
import http from '@/api/http';

const inStoreOrdersService = {
  getAll: async () => {
    const response = await http.get(API_ENDPOINTS.inStoreOrders.getAll);
    return response.data.data;
  },

  getById: async (id: number) => {
    const response = await http.get(API_ENDPOINTS.inStoreOrders.getById(id));
    return response.data.data;
  },

  delete: async (id: number) => {
    await http.delete(API_ENDPOINTS.inStoreOrders.delete(id));
  },
};

export default inStoreOrdersService;
