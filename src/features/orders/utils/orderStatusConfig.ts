export const orderStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  Pending: {
    label: 'Pending',
    className: 'text-yellow-600 bg-yellow-100 border-yellow-300',
  },
  Shipped: {
    label: 'Shipped',
    className: 'text-purple-600 bg-purple-100 border-purple-300',
  },
  Paid: {
    label: 'Paid',
    className: 'text-blue-600 bg-blue-100 border-blue-300',
  },
  Completed: {
    label: 'Completed',
    className: 'text-green-600 bg-green-50 border-green-200',
  },
  Cancelled: {
    label: 'Cancelled',
    className: 'text-red-600 bg-red-50 border-red-200',
  },
};
