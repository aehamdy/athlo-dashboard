import type { VariantType } from '../products.schema';

export function isVariantsComplete(variants?: VariantType[]) {
  if (!variants) return false;

  return variants.every(
    (variant) => variant.price > 0 && variant.stockQuantity > 0,
  );
}
