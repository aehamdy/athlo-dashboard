import type { GetProductsParams } from './types';

export const productKeys = {
  all: (params?: GetProductsParams) => ['products', params] as const,
  detail: (id: number) => ['products', 'detail', id] as const,
  list: (params?: GetProductsParams) =>
    [...productKeys.all(params), 'list'] as const,
  info: (id: number) => ['products', 'info', id] as const,
  media: (id: number) => ['products', 'media', id] as const,
  reviews: (id: number) => ['products', 'reviews', id] as const,
};
