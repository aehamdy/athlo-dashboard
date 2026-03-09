type DateInput = string | Date;

type CouponDateRange = {
  startDate: DateInput;
  endDate: DateInput;
};

export function parseDate(date: DateInput): Date {
  // remove fractional seconds
  const normalized =
    typeof date === "string" ? date.replace(/\.\d+/, "") : date.toISOString();
  return new Date(normalized);
}

function getCouponStatus({ startDate, endDate }: CouponDateRange) {
  const now = Date.now();

  const start = parseDate(startDate).getTime();
  const end = parseDate(endDate).getTime();

  if (now < start) return "Scheduled";
  if (now > end) return "Expired";
  return "Active";
}

export default getCouponStatus;
