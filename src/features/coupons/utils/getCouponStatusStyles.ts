import type { CouponStatus } from "../types";

function getCouponStatusStyles(status: CouponStatus) {
  switch (status) {
    case "Active":
      return "text-green-600 bg-green-100";

    case "Scheduled":
      return "text-blue-600 bg-blue-100";

    case "Expired":
      return "text-red-600 bg-red-100";

    default:
      return "text-gray-600 bg-gray-100";
  }
}

export default getCouponStatusStyles;
