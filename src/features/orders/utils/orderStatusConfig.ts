export const orderStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  Pending: {
    label: 'Pending',
    className: 'text-yellow-600 bg-yellow-200 border-yellow-300',
  },
  Cancelled: {
    label: 'Cancelled',
    className: 'text-red-800 bg-red-200 border-red-300',
  },
  Completed: {
    label: 'Completed',
    className: 'text-green-700 bg-green-200 border-green-300',
  },
  Shipped: {
    label: 'Shipped',
    className: 'text-purple-700 bg-purple-200 border-purple-300',
  },
  Paid: {
    label: 'Paid',
    className: 'text-blue-700 bg-blue-200 border-blue-300',
  },
};
