import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "./types";
import { formatDateTime } from "@/utils/formatDateTime ";

const usersColumns = (): ColumnDef<User>[] => [
  {
    id: "serial",
    header: "#",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-dark">{`${row.original.firstName} ${row.original.lastName}`}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone No.",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.phoneNumber}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.city === "" || row.original.city === null
          ? "Unknown"
          : row.original.city}
      </span>
    ),
  },
  {
    accessorKey: "country",
    header: "country",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.country === "" || row.original.country === null
          ? "Unknown"
          : row.original.country}
      </span>
    ),
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    cell: ({ row }) => {
      const { date } = formatDateTime(row.original.birthDate);
      return <span className="">{date}</span>;
    },
  },
];

export default usersColumns;
