const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION_PATH = `${BASE_URL}/Api/V1`;
const CONTROLLER_PATH = {
  authentication: "/Authentication",
  product: "/Product",
  brand: "/Brand",
  category: "/Category",
  order: "/Order",
  coupon: "/Discount",
  productCoupon: "/Product_Discount",
  user: "/User",
};

export const API_ENDPOINTS = {
  auth: {
    login: `${API_VERSION_PATH}${CONTROLLER_PATH.authentication}/SignIn`,
    refreshToken: `${API_VERSION_PATH}${CONTROLLER_PATH.authentication}/Refresh-Token`,
    validateToken: `${API_VERSION_PATH}${CONTROLLER_PATH.authentication}/Validate-Token`,
  },
  products: {
    getAll: `${API_VERSION_PATH}${CONTROLLER_PATH.product}/List`,
    paginated: (
      pageNumber?: number,
      pageSize?: number,
      search?: string,
      ordering?: string,
    ) => {
      // let url = `${API_VERSION_PATH}/Product/Paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      // if (search && search.trim()) {
      //   url += `&search=${encodeURIComponent(search)}`;
      // }

      // if (ordering && ordering.trim()) {
      //   url += `&ordering=${encodeURIComponent(ordering)}`;
      // }

      // return url;
      const url = `${API_VERSION_PATH}/Product/Paginated?`;

      const params = new URLSearchParams();

      if (pageNumber !== undefined)
        params.append("pageNumber", pageNumber.toString());
      if (pageSize !== undefined)
        params.append("pageSize", pageSize.toString());
      if (search) params.append("search", search);
      if (ordering) params.append("ordering", ordering);

      return url + params.toString();
    },
    getById: (id: string) => `${API_VERSION_PATH}/Product/${id}`,
    getByIdToEdit: (id: number) => `${API_VERSION_PATH}/Product/${id}/To-Edit`,
    getProductWithVariants: (id: number) =>
      `${API_VERSION_PATH}/Product/${id}/With-Variants`,
    create: `${API_VERSION_PATH}/Product/Create`,
    update: `${API_VERSION_PATH}/Product/Edit`,
    addImages: `${API_VERSION_PATH}/ProductImage/CreateProductImages`,
    addVariants: `${API_VERSION_PATH}/ProductVariant/CreateRange`,
    updateImages: `${API_VERSION_PATH}/ProductImage/EditProductImage`,
    updateVariants: `${API_VERSION_PATH}/ProductVariant/Edit`,
    delete: (id: number) => `${API_VERSION_PATH}/Product/${id}`,

    // deleteImage: `${API_VERSION_PATH}/ProductImage/DeleteProductImage`,
    // deleteVariant: (id: number) => `${API_VERSION_PATH}/ProductVariant/${id}`,
  },
  brands: {
    getAll: `${API_VERSION_PATH}${CONTROLLER_PATH.brand}/List`,
    getById: (id: string) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.brand}/GetById/${id}`,
    create: `${API_VERSION_PATH}${CONTROLLER_PATH.brand}/Create`,
    update: `${API_VERSION_PATH}${CONTROLLER_PATH.brand}/Edit`,
    delete: (id: number) => `${API_VERSION_PATH}${CONTROLLER_PATH.brand}/${id}`,
  },
  categories: {
    getAll: `${API_VERSION_PATH}${CONTROLLER_PATH.category}/List`,
    getById: (id: string) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.category}/${id}`,
    create: `${API_VERSION_PATH}${CONTROLLER_PATH.category}/Create`,
    update: `${API_VERSION_PATH}${CONTROLLER_PATH.category}/Edit`,
    delete: (id: number) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.category}/${id}`,
  },
  orders: {
    getAll: `${API_VERSION_PATH}${CONTROLLER_PATH.order}/List`,
    getById: (id: string) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.order}/${id}`,
    create: `${API_VERSION_PATH}${CONTROLLER_PATH.order}/Create`,
    getMyOrders: `${API_VERSION_PATH}${CONTROLLER_PATH.order}/My-Orders`,
    orderStatus: `${API_VERSION_PATH}${CONTROLLER_PATH.order}/order-status`,
    paymentStatus: `${API_VERSION_PATH}${CONTROLLER_PATH.order}/payment-status`,
    userOrder: (userId: string) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.order}/user/${userId}`,
  },
  coupons: {
    getAll: `${API_VERSION_PATH}${CONTROLLER_PATH.coupon}/List`,
    getById: (id: number) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.coupon}/${id}/To-Edit`,
    create: `${API_VERSION_PATH}${CONTROLLER_PATH.coupon}/Create`,
    update: `${API_VERSION_PATH}${CONTROLLER_PATH.coupon}/Edit`,
    delete: (id: number) =>
      `${API_VERSION_PATH}${CONTROLLER_PATH.coupon}/${id}`,
    // Applicable Product Discount endpoints
    getApplicableProducts: `${API_VERSION_PATH}${CONTROLLER_PATH.productCoupon}/ GetProductsByDiscountIdPaginated`,
    addApplicableProduct: `${API_VERSION_PATH}${CONTROLLER_PATH.productCoupon}/AddDiscountToProducts`,
    deleteAllApplicableProducts: `${API_VERSION_PATH}${CONTROLLER_PATH.productCoupon}/RemoveDiscountFromProducts`,
  },
  users: {
    delete: (id: number) => `${API_VERSION_PATH}${CONTROLLER_PATH.user}/${id}`,
    paginated: (pageNumber: number, pageSize: number) => {
      const url = `${API_VERSION_PATH}${CONTROLLER_PATH.user}/Paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      return url;
    },
  },
} as const;
