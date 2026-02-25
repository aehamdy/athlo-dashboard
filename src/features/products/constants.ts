export const PRODUCT_PAGE_SIZE_OPTIONS = [10, 15, 20, 25];

export const PRODUCT_SIZES_OPTIONS = [
  { id: 1, value: "xs", label: "XS" },
  { id: 2, value: "s", label: "S" },
  { id: 3, value: "m", label: "M" },
  { id: 4, value: "l", label: "L" },
  { id: 5, value: "xl", label: "XL" },
  { id: 6, value: "2xl", label: "2XL" },
  { id: 7, value: "3xl", label: "3XL" },
];

export const EDIT_PRODUCT_TABS = [
  {
    key: "info",
    label: "Information",
  },
  {
    key: "media",
    label: "Media",
  },
  {
    key: "variants",
    label: "Variants",
  },
] as const;

export const DEFAULT_EDIT_PRODUCT_TAB = "info";
