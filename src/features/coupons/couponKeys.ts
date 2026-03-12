export const couponKeys = {
  all: ["coupons"] as const,
  detail: (id: number) => ["coupons", "detail", id] as const,
  list: (search?: string) => [...couponKeys.all, "list", search] as const,
  applicableProducts: (id: number) =>
    ["coupons", "applicable-products", id] as const,
};
