export const couponKeys = {
  all: ["coupons"] as const,
  detail: (id: number) => ["coupons", "detail", id] as const,
};
