export const mapOrderToInvoice = (order: any) => {
  // in-store Order
  if (order.saleNumber) {
    return {
      invoiceNumber: order.saleNumber,

      createdAt: order.saleDate,

      cashier: order.createdBy,

      paymentMethod: order.paymentMethod,

      subtotal: order.totalAmount,

      total: order.finalAmount,

      discount: order.discountAmount,

      items: order.items.map((item: any) => ({
        productName: item.productName,

        attribute: item.attributeValue,

        color: item.color,

        quantity: item.quantity,

        unitPrice: item.unitPrice,

        totalPrice: item.totalPrice,
      })),
    };
  }

  // E-Commerce Order
  return {
    invoiceNumber: `ORD-${order.id}`,

    createdAt: order.createdAt,

    paymentMethod: order.paymentMethod,

    subtotal: order.totalAmount,

    total: order.totalAmount,

    customer: {
      name: order.shipmentInfo?.fullName,

      phone: order.shipmentInfo?.phoneNumber,

      city: order.shipmentInfo?.city,

      region: order.shipmentInfo?.region,

      address: order.shipmentInfo?.streetAddress,

      buildingNumber: order.shipmentInfo?.buildingNumber,

      floorNumber: order.shipmentInfo?.floorNumber,

      apartmentNumber: order.shipmentInfo?.apartmentNumber,

      shippingMethod: order.shipmentInfo?.shippingMethod,

      trackingNumber: order.shipmentInfo?.trackingNumber,

      notes: order.shipmentInfo?.notes,
    },

    items: order.items.map((item: any) => ({
      productName: item.productName,

      attributeKey: item.attributeKey,
      attribute: item.attributeValue,

      color: item.color,

      unit: item.unit,

      quantity: item.quantity,

      unitPrice: item.unitPrice,

      totalPrice: item.totalPrice,
    })),
  };
};
