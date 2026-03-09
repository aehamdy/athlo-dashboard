import Heading from "@/components/shared/Heading";
import type { Coupon } from "../types";
import { formatDateTime } from "@/utils/formatDateTime ";
import getCouponStatus from "../utils/getCouponStatus";
import { Badge } from "@/components/ui/badge";
import getCouponStatusStyles from "../utils/getCouponStatusStyles";

type CouponDetailsProps = {
  coupon: Coupon;
};

function CouponDetails({ coupon }: CouponDetailsProps) {
  const { date: startDate } = formatDateTime(coupon.startDate);
  const { date: endDate } = formatDateTime(coupon.endDate);
  const couponStatus = getCouponStatus({
    startDate: new Date(coupon.startDate),
    endDate: new Date(coupon.endDate),
  });
  const couponStatusClass = getCouponStatusStyles(couponStatus);

  return (
    <section className="h-full p-regular space-y-md">
      <section className="h-[150px]">
        <div className="relative flex flex-col justify-between items-center gap-xs h-full p-base bg-accent-soft border border-dashed border-white rounded-md shadow-lg">
          <span className="absolute top-1/2 -translate-y-1/2 start-0 -translate-x-1/2 w-4 h-4 bg-linear-to-r from-transparent to-50% to-white rounded-full z-10" />
          <span className="absolute top-1/2 -translate-y-1/2 end-0 translate-x-1/2 w-4 h-4 bg-linear-to-l from-transparent to-50% to-white rounded-full z-10" />
          <span className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 border-b border-dashed border-accent-strong" />

          <div className="flex flex-col justify-start gap-tiny w-full">
            {/* <Icon name="TicketPercent" className="text-white" size={24} /> */}
            <p className="font-semibold text-md text-dark">{coupon.code}</p>
            <p className="font-semibold text-xs text-gray-700">
              {coupon.percentage}% OFF{" "}
              {coupon.type === "Global"
                ? "Entire Collections"
                : "On Specific Products"}
            </p>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col justify-start">
              <p className="font-medium text-tiny uppercase tracking-widest">
                Coupon Name
              </p>
              <p className="text-xs text-gray-600">{coupon.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[310px] overflow-y-auto">
        <section className="flex flex-col gap-sm py-tiny border-b">
          <Heading
            as="h5"
            className="font-semibold text-tiny md:text-tiny text-gray-400 uppercase tracking-widest"
          >
            Configuration
          </Heading>

          <div className="space-y-xs">
            <div className="flex justify-between items-center">
              <p className="font-medium text-tiny text-gray-500 uppercase tracking-widest">
                Status
              </p>

              <Badge
                variant="default"
                className={`uppercase rounded-md ${couponStatusClass}`}
              >
                {couponStatus}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-tiny text-gray-500 uppercase tracking-widest">
                Discount Type
              </p>
              <p className="font-semibold text-xs text-zinc-800">
                {coupon.type}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-tiny text-gray-500 uppercase tracking-widest">
                Discount Value
              </p>
              <p className="font-semibold text-xs text-red-600">
                -{coupon.percentage}%
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-tiny text-gray-500 uppercase tracking-widest">
                Start Date
              </p>
              <p className="font-semibold text-xs text-zinc-800">{startDate}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-tiny text-gray-500 uppercase tracking-widest">
                End Date
              </p>
              <p className="font-semibold text-xs text-zinc-800">{endDate}</p>
            </div>

            <div className=""></div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default CouponDetails;
