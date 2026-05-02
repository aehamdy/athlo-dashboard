const inStoreOrderKeys = {
  all: ['in-store-orders'],
  detail: (id: number) => ['in-store-order', 'details', id],
};

export default inStoreOrderKeys;
