interface InvoiceItem {
  productName: string;

  attribute?: string;
  color?: string;

  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface InvoiceCustomerData {
  name?: string;
  phone?: string;
  city?: string;
  region?: string;
  address?: string;
  buildingNumber?: number;
  floorNumber?: number;
  apartmentNumber?: number;
  shippingMethod?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  createdAt: string;

  customer?: InvoiceCustomerData;

  cashier?: string;

  paymentMethod?: string;

  subtotal: number;
  total: number;
  discount?: number;

  items: InvoiceItem[];
}
