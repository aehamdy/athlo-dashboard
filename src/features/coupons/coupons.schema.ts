import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(4, "Coupon code must be at least 4 characters"),
  percentage: z.number("Value must be a number").min(1).max(100),
  nameEn: z.string().min(3, "English name must be at least 3 characters"),
  nameAr: z.string().min(3, "Arabic name must be at least 3 characters"),
  type: z
    .number({
      message: "Coupon type is required",
    })
    .refine((val) => [0, 1].includes(val), {
      message: "Invalid coupon type",
    }),
  startDate: z.date("Start date is required"),
  endDate: z.date("End date is required"),
});

export type CouponFormValues = z.infer<typeof couponSchema>;
