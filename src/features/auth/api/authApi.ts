import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";

export const loginRequest = (data: { username: string; password: string }) => {
  return http.post(API_ENDPOINTS.auth.login, {
    userName: data.username,
    password: data.password,
  });
};
