export type CouponStatus = 'Active' | 'Scheduled' | 'Expired';

export type CouponFormMode = 'create' | 'edit';

export type CouponTypeOption = {
  value: number;
  label: string;
};

export type Coupon = {
  id: number;
  code?: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  percentage: number;
  startDate: string;
  endDate: string;
  type?: 'Global' | 'ProductSpecific' | number;
  status?: 'Upcoming' | 'Active' | 'Expired';
  daysRemaining?: number;
  productsCount: number;
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
