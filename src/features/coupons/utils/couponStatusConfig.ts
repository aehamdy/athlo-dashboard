import type { CouponStatus } from "../types";

export const couponStatusConfig: Record<
  CouponStatus,
  {
    label: string;
    className: string;
  }
> = {
  Active: {
    label: "Active",
    className: "text-green-700 bg-green-100",
  },
  Scheduled: {
    label: "Scheduled",
    className: "text-blue-700 bg-blue-100",
  },
  Expired: {
    label: "Expired",
    className: "text-gray-600 bg-gray-100",
  },
};
