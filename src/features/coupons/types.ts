export type CouponStatus = 'Active' | 'Scheduled' | 'Expired';

export type CouponFormMode = 'create' | 'edit';

export type CouponTypeOption = {
  value: number;
  label: string;
};

export type Coupon = {
  id: number;
  code: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  percentage: number;
  startDate: string;
  endDate: string;
  type: number | 'Global' | 'ProductSpecific';
};

export type couponFormValue = {
  code: string;
  nameEn: string;
  nameAr: string;
  percentage: number;
  startDate: Date | string;
  endDate: Date | string;
  type: number;
};
