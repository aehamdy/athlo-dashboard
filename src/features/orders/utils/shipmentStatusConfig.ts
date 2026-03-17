export const shipmentStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  Processing: {
    label: 'Processing',
    className: 'text-yellow-700 bg-yellow-100',
  },
  Shipped: {
    label: 'Shipped',
    className: 'text-blue-700 bg-blue-100',
  },
  Delivered: {
    label: 'Delivered',
    className: 'text-green-700 bg-green-100',
  },
  Cancelled: {
    label: 'Cancelled',
    className: 'text-red-700 bg-red-100',
  },
};
