const inStoreOrderKeys = {
  all: ['in-store-orders'],
  detail: (id: number) => ['in-store-order', 'details', id],
  variantsByCode: (code: string) => ['variants', 'by-code', code],
};

export default inStoreOrderKeys;
