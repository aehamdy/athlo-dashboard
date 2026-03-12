import { formatDateTime } from "@/utils/formatDateTime";
import type { ColumnDef } from "@tanstack/react-table";
import type { Coupon } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/shared/Icon";
import getCouponStatus from "./utils/getCouponStatus";
import { couponStatusConfig } from "./utils/couponStatusConfig";

const couponsColumns = (
  onDelete: (id: number) => void,
  onEdit: (id: number) => void,
): ColumnDef<Coupon>[] => [
  {
    accessorKey: "code",
    header: "Code",
    enableGlobalFilter: true,
    cell: ({ row }) => (
      <span className="">
        <Badge className="relative py-2 px-3 bg-accent/50 text-dark border border-white rounded-sm">
          <div className="absolute w-2 h-2 top-1/2 start-0 -translate-y-1/2 -translate-x-1/2 bg-white z-10 rounded-full" />
          <div className="absolute w-2 h-2 top-1/2 end-0 -translate-y-1/2 translate-x-1/2 bg-white z-10 rounded-full" />
          {row.original.code.toUpperCase()}
        </Badge>
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const coupon = row.original;
      const status = getCouponStatus({
        startDate: new Date(coupon.startDate),
        endDate: new Date(coupon.endDate),
      });

      const config = couponStatusConfig[status];

      return (
        <Badge className={`uppercase rounded-md ${config.className}`}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="">{row.original.name}</span>,
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ row }) => (
      <span className="">
        <Badge className="p-2 font-bold text-white bg-red-400 rounded-md">
          {row.original.percentage}%
        </Badge>
      </span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const { date: startDate } = formatDateTime(row.original.startDate);

      return <span className="font-medium text-cyan-600">{startDate}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const { date: endDate } = formatDateTime(row.original.endDate);

      return <span className="font-medium text-cyan-600">{endDate}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const typeValue = row.original.type;
      const type =
        typeof typeValue === "string" && typeValue.toLowerCase() === "global"
          ? "Global"
          : "Specific";
      return <span className="">{type}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end items-center gap-sm">
        <Button
          variant="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row.original.id);
          }}
          className="group hover:bg-gray-100"
        >
          <Icon name="Pencil" className="group-hover:text-blue-400" />
        </Button>

        <Button
          variant="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row.original.id);
          }}
          className="group hover:bg-gray-100"
        >
          <Icon name="Trash2" className="group-hover:text-red-400" />
        </Button>
      </div>
    ),
  },
];

export default couponsColumns;
