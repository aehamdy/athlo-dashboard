const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/Api/V1/Authentication/SignIn`,
    refreshToken: `${BASE_URL}/Api/V1/Authentication/Refresh-Token`,
    validateToken: `${BASE_URL}/Api/V1/Authentication/Validate-Token`,
  },
  brands: {
    getAll: `${BASE_URL}/Api/V1/Brand/List`,
    getById: (id: string) => `${BASE_URL}/Api/V1/Brand/GetById/${id}`,
    create: `${BASE_URL}/Api/V1/Brand/Create`,
    update: `${BASE_URL}/Api/V1/Brand/Edit`,
    delete: (id: string) => `${BASE_URL}/Api/V1/Brand/${id}`,
  },
} as const;
