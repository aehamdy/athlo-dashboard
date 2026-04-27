import { API_ENDPOINTS } from '@/api/endpoints';
import http from '@/api/http';

const overviewService = {
  getOverview: () => {
    return http.get(API_ENDPOINTS.overview.getOverview);
  },
};

export default overviewService;
