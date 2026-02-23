import type { VariantType } from "../schemas";

export function isVariantsComplete(variants?: VariantType[]) {
  if (!variants) return false;

  return variants.every(
    (variant) =>
      variant.size.trim() &&
      variant.color.trim() &&
      variant.colorCode.trim() &&
      variant.price > 0 &&
      variant.stock > 0,
  );
}
