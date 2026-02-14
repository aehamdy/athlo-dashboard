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
    delete: (id: number) => `${BASE_URL}/Api/V1/Product/${id}`,
    paginated: (
      pageNumber: number,
      pageSize: number,
      search?: string,
      ordering?: string,
    ) => {
      let url = `${BASE_URL}/Api/V1/Product/Paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      if (search && search.trim()) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (ordering && ordering.trim()) {
        url += `&ordering=${encodeURIComponent(ordering)}`;
      }

      return url;
    },
    addImages: `${BASE_URL}/Api/V1/ProductImage/CreateProductImages`,
    addVariants: `${BASE_URL}/Api/V1/ProductVariant/CreateRange`,
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
    delete: (id: number) => `${BASE_URL}/Api/V1/Category/${id}`,
  },
  orders: {
    getAll: `${BASE_URL}/Api/V1/Order/List`,
    getById: (id: string) => `${BASE_URL}/Api/V1/Order/${id}`,
    create: `${BASE_URL}/Api/V1/Order/Create`,
    getMyOrders: `${BASE_URL}/Api/V1/Order/My-Orders`,
    orderStatus: `${BASE_URL}/Api/V1/Order/order-status`,
    paymentStatus: `${BASE_URL}/Api/V1/Order/payment-status`,
    userOrder: (userId: string) => `${BASE_URL}/Api/V1/Order/user/${userId}`,
  },
  coupons: {
    getAll: `${BASE_URL}/Api/V1/Discount/List`,
    getById: (id: number) => `${BASE_URL}/Api/V1/Discount/${id}`,
    create: `${BASE_URL}/Api/V1/Discount/Create`,
    update: `${BASE_URL}/Api/V1/Discount/Edit`,
    delete: (id: number) => `${BASE_URL}/Api/V1/Discount/${id}`,
  },
  users: {
    delete: (id: number) => `${BASE_URL}/Api/V1/User/${id}`,
    paginated: (pageNumber: number, pageSize: number) => {
      const url = `${BASE_URL}/Api/V1/User/Paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      return url;
    },
  },
} as const;
