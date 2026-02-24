import type {
  ColumnDef,
  PaginationState,
  SortingState,
  OnChangeFn,
} from "@tanstack/react-table";

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  pageSizeOptions?: number[];
  className?: string;
}
export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  club: string | null;
  basePrice: number;
  priceAfterDiscount: number;
  season: string;
  brandName: string;
  categoryName: string;
  images: string[];
}

export interface PaginatedProductsResponse {
  data: Product[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetProductsParams {
  pageIndex: number;
  pageSize: number;
  sorting?: {
    id: string;
    desc: boolean;
  }[];
  search?: string;
}
