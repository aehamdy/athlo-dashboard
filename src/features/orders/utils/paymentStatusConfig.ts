export const paymentStatusConfig: Record<
  string,
  { label: string; indicatorColor: string; className: string }
> = {
  Pending: {
    label: 'Pending',
    indicatorColor: 'bg-yellow-500',
    className: 'text-yellow-700 bg-yellow-100',
  },
  Completed: {
    label: 'Completed',
    indicatorColor: 'bg-green-500',
    className: 'text-green-600 bg-green-100',
  },
  Failed: {
    label: 'Failed',
    indicatorColor: 'bg-red-500',
    className: 'text-red-500 bg-red-100',
  },
};
