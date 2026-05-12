import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import { loginRequest } from '../api/authApi';
import { saveAuthTokens } from '../services/authService';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await loginRequest({ username, password });

      if (!response.data.succeeded) {
        setError(response.data.message || 'Login failed');
        return false;
      }

      saveAuthTokens(
        response.data.data.accessToken,
        response.data.data.refreshToken.tokenString,
      );

      navigate(ROUTE_PATHS.dashboard.overview, { replace: true });

      return true;
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(
        axiosError.response?.data?.message ||
          'An error occurred. Please try again.',
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
