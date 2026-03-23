import { EDIT_PRODUCT_TABS } from './constants';

export type EditProductTab = (typeof EDIT_PRODUCT_TABS)[number]['key'];

import type {
  ColumnDef,
  PaginationState,
  SortingState,
  OnChangeFn,
} from '@tanstack/react-table';

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
  onRowClick?: (row: TData) => void;
  globalFilter?: string;
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
  id: number;
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
  pageIndex?: number;
  pageSize?: number;
  sorting?: {
    id: string;
    desc: boolean;
  }[];
  search?: string;
}

export interface IProductReview {
  id: number;
  productId: number;
  productName: string;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
