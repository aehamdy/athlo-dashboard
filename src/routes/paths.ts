export const ROUTE_PATHS = {
  login: "/login",

  dashboard: {
    root: "/",
    overview: "/overview",
    products: "/products",
    addProduct: "/products/add",
    editProductImages: (id: string) => `/products/${id}/edit?step=images`,
    editProductVariants: (id: string) => `/products/${id}/edit?step=variants`,
    categories: "/categories",
    brands: "/brands",
    orders: "/orders",
    coupons: "/coupons",
    users: "/users",
  },
} as const;
