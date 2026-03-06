import { useQuery } from "@tanstack/react-query";
import usersServices from "../services/usersService";

function useFetchPaginatedUsers(pageNumber: number, pageSize: number) {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => usersServices.getPaginated(pageNumber, pageSize),
  });

  return { ...query };
}

export default useFetchPaginatedUsers;
