import type { ApiResponse } from '@/types';
import http from '@/api/http';
import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';

function useFetchAll<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await http.get<ApiResponse<T>>(endpoint);

        setData(response.data.data);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as AxiosError<ApiResponse<unknown>>;

          setError(
            JSON.stringify(axiosError.response?.data) || axiosError.message,
          );
        } else {
          setError(new Error('An unknown error occurred'));
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
