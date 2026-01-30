export type ApiResponse<T> = {
  succeeded: boolean;
  message?: string;
  data: T;
};

export type Brand = {
  id: number;
  name?: string;
  nameEn: string;
  nameAr: string;
};

export type Category = {
  id: number;
  name?: string;
  nameEn: string;
  nameAr: string;
};

export type Order = {
  orderId: number;
  userId: number;
  userEmail: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
};

export type Product = {
  id: number;
  code: string;
  name: string;
  description: string;
  season: string;
  club: string;
  basePrice: number;
  priceAfterDiscount: number;
  brandName: string;
  categoryName: string;
  images: string[];
};
