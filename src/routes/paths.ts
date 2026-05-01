export const ROUTE_PATHS = {
  login: '/login',

  dashboard: {
    root: '/',
    overview: '/overview',
    products: '/products',
    addProduct: '/products/add',
    editProductPath: '/products/:id/edit',
    editProductTabPath: '/products/:id/edit/:tab',
    editProduct: (id: string | number, tab?: string) =>
      tab ? `/products/${id}/edit/${tab}` : `/products/${id}/edit`,
    categories: '/categories',
    brands: '/brands',
    orders: {
      root: '/orders',
      eCommerce: '/orders/e-commerce',
      inStore: '/orders/in-store',
    },
    coupons: '/coupons',
    users: '/users',
  },
} as const;
