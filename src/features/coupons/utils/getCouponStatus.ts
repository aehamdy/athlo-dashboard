import type { CouponStatus } from "../types";

type DateInput = string | Date;

type CouponDateRange = {
  startDate: DateInput;
  endDate: DateInput;
};

function getCouponStatus({
  startDate,
  endDate,
}: CouponDateRange): CouponStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "Scheduled";
  if (now > end) return "Expired";
  return "Active";
}

export default getCouponStatus;
