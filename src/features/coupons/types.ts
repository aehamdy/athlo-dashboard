export type CouponStatus = "Active" | "Scheduled" | "Expired";

export type Coupon = {
  id: number;
  code: string;
  name: string;
  percentage: number;
  startDate: Date;
  endDate: Date;
  type: "ProductSpecific" | "Global";
};

export type couponFormValue = {
  code: string;
  nameEn: string;
  nameAr: string;
  percentage: number;
  startDate: Date;
  endDate: Date;
  type: number;
};
