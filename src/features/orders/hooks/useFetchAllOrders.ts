import { useQuery } from "@tanstack/react-query";
import ordersService from "../services/ordersService";

function useFetchAllOrders() {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersService.getAll(),
  });

  return { ...query };
}

export default useFetchAllOrders;
