import axios from "axios";
import Cookies from "js-cookie";
import { AUTH } from "@/constants/auth";
import { ROUTE_PATHS } from "@/routes/paths";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* Refresh Token Function */
export async function refreshToken() {
  const refreshToken = Cookies.get(AUTH.COOKIE.REFRESH_TOKEN);
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await http.post("/Api/V1/Authentication/Refresh-Token", {
    token: refreshToken,
  });

  // Save new access token
  Cookies.set(AUTH.COOKIE.ACCESS_TOKEN, response.data.accessToken, {
    path: "/",
    expires: 1,
  });

  return response.data.accessToken;
}

/* Request Interceptor: add token to every request */
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get(AUTH.COOKIE.ACCESS_TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* Response Interceptor: refresh or logout */
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return http(originalRequest); // retry original request
      } catch {
        // Refresh failed → logout
        Cookies.remove(AUTH.COOKIE.ACCESS_TOKEN);
        Cookies.remove(AUTH.COOKIE.REFRESH_TOKEN);
        window.location.replace(ROUTE_PATHS.login);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
