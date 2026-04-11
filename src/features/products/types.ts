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
  brandName?: string;
  brandNameEn?: string;
  brandNameAr?: string;
  brandId?: number;
  categoryName?: string;
  categoryNameEn?: string;
  categoryNameAr?: string;
  categoryId?: number;
  basePrice: number;
  minPrice?: number;
  maxPrice?: number;
  priceAfterDiscount?: number;
  minPriceAfterDiscount?: number;
  maxPriceAfterDiscount?: number;
  attributeKey?: string;
  attributeKeyEn?: string;
  attributeKeyAr?: string;
  hasVariants?: boolean;
  season: string;
  images: string[];
}

export interface ProductDetails {
  id: number;
  code: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  season: string;
  clubEn: string;
  clubAr: string;
  brandId: number;
  brandNameEn: string;
  brandNameAr: string;
  categoryId: number;
  categoryNameEn: string;
  categoryNameAr: string;
  basePrice: number;
  minPrice: number;
  maxPrice: number;
  minPriceAfterDiscount: number;
  maxPriceAfterDiscount: number;
  priceAfterDiscount: number;
  hasVariants: boolean;
  attributeKeyEn: string;
  attributeKeyAr: string;
  images: string[];
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  priceAfterDiscount: number;
  stockQuantity: number;
  inStock: boolean;
  attributes: {
    keyEn: string;
    keyAr: string;
    type: string;
    valueEn: string;
    valueAr: string;
    colorHex: string;
  }[];
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
  attributeKeyEn: string;
  attributeKeyAr: string;
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
