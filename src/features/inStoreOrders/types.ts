export type InStorePaymentMethod = 1 | 2;

export type InStoreOrderStatusValue = '0' | '1' | '2';

export interface InStoreOrderListItem {
  id: number;
  saleNumber: string;
  saleDate: string;

  finalAmount: number;

  paymentMethod: string | number;
  status: InStoreOrderStatusValue | number;

  createdBy: string;
  itemsCount: number;
}

export interface InStoreOrderItem {
  productVariantId: number;

  productName: string;
  attributeValue?: string;
  color?: string;

  sku: string;

  quantity: number;

  unitPrice: number;
  discountAmount: number;
  totalPrice: number;
}

export interface InStoreOrderDetails {
  id: number;

  saleNumber: string;
  saleDate: string;

  totalAmount: number;
  discountAmount: number;
  finalAmount: number;

  paymentMethod: string | number;
  status: InStoreOrderStatusValue | number;

  notes?: string | null;
  createdBy: string;

  items: InStoreOrderItem[];
}

export interface CreateInStoreOrderPayload {
  paymentMethod: InStorePaymentMethod;
  notes?: string;

  items: CreateInStoreOrderItem[];
}

export interface CreateInStoreOrderItem {
  productVariantId: number;
  quantity: number;
}
