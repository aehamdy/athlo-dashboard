import type { ColumnDef } from '@tanstack/react-table';
import type { InStoreOrderListItem } from './types';
import { formatDateTime } from '@/utils/formatDateTime';
import Currency from '@/components/shared/Currency';
import { Button } from '@/components/ui/button';
import Icon from '@/components/shared/Icon';

const inStoreOrdersColumns = (
  setOrderToDelete: (order: InStoreOrderListItem) => void,
): ColumnDef<InStoreOrderListItem>[] => [
  {
    accessorKey: 'saleNumber',
    header: 'Order No.',
    cell: ({ row }) => (
      <span className="font-semibold text-xs text-dark">
        #{row.original.saleNumber}
      </span>
    ),
  },
  {
    accessorKey: 'createdBy',
    header: 'Created By',
    cell: ({ row }) => {
      const createdBy = row.original.createdBy
        .split(/[.\s]+/)
        .filter(Boolean)
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ');

      return <span className="">{createdBy}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const { date, time } = formatDateTime(row.original.saleDate);

      return (
        <div className="flex justify-center items-center gap-xs font-medium">
          <span className="text-blue-500">{date}</span>
          <span className="text-gray-400">-</span>
          <span className="text-gray-500">{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'itemsCount',
    header: 'Items',
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.itemsCount}</span>
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Price',
    cell: ({ row }) => (
      <span className="flex justify-center items-center gap-xs font-semibold text-accent-strong">
        <Currency symbol />
        {row.original.finalAmount.toLocaleString('en-GB')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <span className="">{row.original.status}</span>,
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => <span className="">{row.original.paymentMethod}</span>,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="icon"
          className="p-sm text-gray-500 hover:text-red-400 bg-gray-100"
          onClick={() => {
            setOrderToDelete(row.original);
          }}
        >
          <Icon name="Trash2" className="text-current" />
        </Button>
      </div>
    ),
  },
];

export default inStoreOrdersColumns;
