import { useQuery } from "@tanstack/react-query";
import ordersService from "../services/ordersService";

function useFetchOrder(id: number) {
  return useQuery({
    queryKey: [],
    queryFn: () => ordersService.getCouponDetails(id),
  });
}

export default useFetchOrder;
