import type { ColumnDef } from "@tanstack/react-table";

export type User = {
  id?: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  birthDate: string;
  city: string;
  region: string;
  country: string;
  postalCode: string | number | null;
};
export interface DataTableProps<TData> {
  data: TData[];
  isLoading?: boolean;
  error?: unknown;
  columns: ColumnDef<TData>[];
  // pagination?: PaginationState;
  // onPaginationChange?: OnChangeFn<PaginationState>;
  // pageCount?: number;
  // sorting?: SortingState;
  // onSortingChange?: OnChangeFn<SortingState>;
  // pageSizeOptions?: number[];
  // onRowClick?: (row: TData) => void;
  className?: string;
}
