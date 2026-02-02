import { useEffect, useState } from "react";
import http from "@/api/http";
import type { AxiosError } from "axios";
import type { PaginatedResponse } from "@/types";

type PaginatedEndpointBuilder = (
  pageNumber: number,
  pageSize: number,
  search?: string,
  ordering?: string,
) => string;

function useFetchPaginatedData<T>(
  buildEndpoint: PaginatedEndpointBuilder,
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  ordering?: string,
) {
  const [data, setData] = useState<PaginatedResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = buildEndpoint(pageNumber, pageSize, search, ordering);

        const response = await http.get(endpoint);
        const respData = response.data;

        setData({
          items: respData.data,
          currentPage: respData.currentPage,
          totalPages: respData.totalPages,
          pageSize: respData.pageSize,
          totalCount: respData.totalCount,
          hasNextPage: respData.hasNextPage,
          hasPreviousPage: respData.hasPreviousPage,
        });
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message ||
            axiosError.message ||
            "API Error",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [buildEndpoint, pageNumber, pageSize, search, ordering]);

  return { data, loading, error };
}

export default useFetchPaginatedData;
