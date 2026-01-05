const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/Api/V1/Authentication/SignIn`,
    refreshToken: `${BASE_URL}/Api/V1/Authentication/Refresh-Token`,
    validateToken: `${BASE_URL}/Api/V1/Authentication/Validate-Token`,
  },
} as const;
