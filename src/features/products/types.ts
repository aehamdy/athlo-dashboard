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
  error?: unknown;
  className?: string;
}
export interface Product {
  id: number;
  code: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  club?: string | null;
  clubEn?: string | null;
  clubAr?: string | null;
  basePrice: number;
  priceAfterDiscount: number;
  season: string;
  brandName?: string;
  brandId?: number;
  categoryName?: string;
  categoryId?: number;
  images: string[];
}

export interface ProductForm {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  clubEn: string;
  clubAr: string;
  categoryId: number | undefined;
  brandId: number | undefined;
  code: string;
  season: string;
  basePrice: number;
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

import { EDIT_PRODUCT_TABS } from "./constants";

export type EditProductTab = (typeof EDIT_PRODUCT_TABS)[number]["key"];
