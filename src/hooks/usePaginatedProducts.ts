import { useState, useEffect } from "react";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endPoints";
import type { Product } from "@/types";
import type { AxiosError } from "axios";

interface PaginatedProducts {
  items: Product[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function usePaginatedProducts(
  pageNumber: number = 1,
  pageSize: number = 6,
  search?: string,
  ordering?: string,
) {
  const [data, setData] = useState<PaginatedProducts | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.products.paginated(
          pageNumber,
          pageSize,
          search,
          ordering,
        );

        const response = await http.get(endpoint);

        const respData = response.data;

        // Map backend fields to frontend state
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
  }, [pageNumber, pageSize, search, ordering]);

  return { data, loading, error };
}
