import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";

const usersServices = {
  getPaginated: async (pageNumber: number, pageSize: number) => {
    const response = await http.get(
      API_ENDPOINTS.users.paginated(pageNumber, pageSize),
    );

    return response.data.data;
  },
};

export default usersServices;
