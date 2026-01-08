import type { ApiResponse } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

function useFetchAll<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const response = await axios.get<ApiResponse<T>>(endpoint);

        setData(response.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "API request failed";

          setError(new Error(errorMessage));
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [endpoint]);

  return { data, error, loading };
}

export default useFetchAll;
