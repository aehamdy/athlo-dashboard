const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/Api/V1/Authentication/SignIn`,
    // logout: `${BASE_URL}/auth/logout`,
    // profile: `${BASE_URL}/auth/profile`,
  },

  //   dashboard: {
  //     overview: `${BASE_URL}/dashboard/overview`,
  //   },

  //   products: {
  //     list: `${BASE_URL}/products`,
  //     details: (id: string) => `${BASE_URL}/products/${id}`,
  //     create: `${BASE_URL}/products`,
  //     update: (id: string) => `${BASE_URL}/products/${id}`,
  //   },

  //   categories: {
  //     list: `${BASE_URL}/categories`,
  //     create: `${BASE_URL}/categories`,
  //   },
} as const;
