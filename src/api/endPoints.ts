const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/Api/V1/Authentication/SignIn`,
    refreshToken: `${BASE_URL}/Api/V1/Authentication/Refresh-Token`,
    validateToken: `${BASE_URL}/Api/V1/Authentication/Validate-Token`,
  },
  products: {
    getAll: `${BASE_URL}/Api/V1/Product/List`,
    getById: (id: string) => `${BASE_URL}/Api/V1/Product/${id}`,
    create: `${BASE_URL}/Api/V1/Product/Create`,
    update: `${BASE_URL}/Api/V1/Product/Edit`,
    delete: (id: string) => `${BASE_URL}/Api/V1/Product/${id}`,
    // paginated: `${BASE_URL}/Api/V1/Product/Paginated`,
    // withVariants: (id: string) => `${BASE_URL}/Api/V1/Product/${id}/With-Variants`,
  },
  brands: {
    getAll: `${BASE_URL}/Api/V1/Brand/List`,
    getById: (id: string) => `${BASE_URL}/Api/V1/Brand/GetById/${id}`,
    create: `${BASE_URL}/Api/V1/Brand/Create`,
    update: `${BASE_URL}/Api/V1/Brand/Edit`,
    delete: (id: string) => `${BASE_URL}/Api/V1/Brand/${id}`,
  },
  categories: {
    getAll: `${BASE_URL}/Api/V1/Category/List`,
    getById: (id: string) => `${BASE_URL}/Api/V1/Category/${id}`,
    create: `${BASE_URL}/Api/V1/Category/Create`,
    update: `${BASE_URL}/Api/V1/Category/Edit`,
    delete: (id: string) => `${BASE_URL}/Api/V1/Category/${id}`,
  },
} as const;
