import { API_ENDPOINTS } from '@/api/endpoints';
import http from '@/api/http';

const inStoreOrdersService = {
  getAll: async () => {
    const response = await http.get(API_ENDPOINTS.inStoreOrders.getAll);
    return response.data.data;
  },
};

export default inStoreOrdersService;
