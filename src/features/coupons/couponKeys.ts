export const couponKeys = {
  all: ["coupons"] as const,
  detail: (id: number) => ["coupons", "detail", id] as const,
  applicableProducts: (id: number) =>
    ["coupons", "applicable-products", id] as const,
};
