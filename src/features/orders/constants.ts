export const orderStatuses = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Shipped' },
  { value: 2, label: 'Paid' },
  { value: 3, label: 'Completed' },
  { value: 4, label: 'Cancelled' },
];

export const statusStringToNumber: Record<string, number> = {
  Pending: 0,
  Shipped: 1,
  Paid: 2,
  Completed: 3,
  Cancelled: 4,
};
