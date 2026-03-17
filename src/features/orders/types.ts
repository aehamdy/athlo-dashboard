export type Order = {
  orderId: number;
  userId: number;
  userEmail: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
};

export type OrderDetails = {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  userId: number;
  userEmail: string;
  userName: string;
  paymentStatus: string;
  paymentMethod: string;
  paidAt: string | null;
  totalQuantity: number;
  shipmentInfo: {
    fullName: string;
    city: string;
    country: string;
    region: string;
    streetAddress: string;
    buildingNumber: number;
    floorNumber: number;
    apartmentNumber: number;
    phoneNumber: string;
    notes: string;
    trackingNumber: string;
    shippingMethod: string;
    shipmentStatus: string;
  };
  items: {
    productVariantId: number;
    productName: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    attributes: {
      keyEn: string;
      keyAr: string;
      type: string;
      valueEn: string;
      valueAr: string;
      colorHex: string | null;
    }[];
  }[];
};

export type OrderItem = {
  productVariantId: number;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  attributes: {
    keyEn: string;
    keyAr: string;
    type: string;
    valueEn: string;
    valueAr: string;
    colorHex: string | null;
  }[];
};
