export const PRODUCT_SIZES_OPTIONS = [
  { id: 1, value: 'xs', label: 'XS' },
  { id: 2, value: 's', label: 'S' },
  { id: 3, value: 'm', label: 'M' },
  { id: 4, value: 'l', label: 'L' },
  { id: 5, value: 'xl', label: 'XL' },
  { id: 6, value: '2xl', label: '2XL' },
  { id: 7, value: '3xl', label: '3XL' },
];

export const EDIT_PRODUCT_TABS = [
  {
    key: 'info',
    label: 'Information',
  },
  {
    key: 'media',
    label: 'Media',
  },
  {
    key: 'variants',
    label: 'Variants',
  },
] as const;

export const DEFAULT_EDIT_PRODUCT_TAB = 'info';

export const STOCK_QUANTITY_RULES = [
  {
    id: 1,
    max: 0,
    limit: '0',
    label: 'Out Of Stock',
    className: 'bg-red-500 text-white',
  },
  {
    id: 2,
    max: 6,
    limit: '1 ~ 6',
    label: 'Low Stock',
    className: 'bg-red-100 text-red-700',
  },
  {
    id: 3,
    max: 15,
    limit: '7 ~ 15',
    label: 'Medium Stock',
    className: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 4,
    max: Infinity,
    limit: '16+',
    label: 'High Stock',
    className: 'bg-green-100 text-green-700',
  },
] as const;
