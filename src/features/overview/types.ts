import * as Icons from 'lucide-react';

export type KpiDetail = {
  id: number;
  title: string;
  amount?: number;
  value?: number;
};

export type KpiCardType = {
  id: number;
  title: string;
  icon: keyof typeof Icons;
  amount?: number;
  value?: number;
  details?: KpiDetail[];
  colors: {
    background: string;
    primary: string;
    secondary: string;
  };
};

export type RevenueChartType = {
  date: string;
  onlineRevenue: number;
  posRevenue: number;
  totalRevenue: number;
};

export type OrderStatusChartType = {
  status: 'Pending' | 'Cancelled' | 'Shipped' | 'Paid' | 'Completed';
  count: number;
  percentage: number;
};

export type RatingsOverviewType = {
  averageRating: number;
  totalReviews: number;
  distribution: {
    stars: number;
    count: number;
    percentage: number;
  }[];
};

export type RecentOfflineSales = {
  id: number;
  saleNumber: string;
  finalAmount: number;
  paymentMethod: string;
  saleDate: string;
  createdBy: string;
};

export type City = {
  city: string;
  ordersCount: number;
  percentage: number;
};

export type RecentOrder = {
  orderId: number;
  customerName: string;
  totalAmount: number;
  status: 'Pending' | 'Cancelled' | 'Shipped' | 'Paid' | 'Completed';
  createdAt: string;
};

export type TopProductType = {
  productId: number;
  productName: string;
  imageUrl: string;
  totalQuantitySold: number;
  totalRevenue: number;
};
