import type { VariantType } from "../schemas";

export function transformVariants(variants: VariantType[]) {
  return variants.map((variant) => ({
    size: variant.size.toUpperCase(),
    colorName:
      variant.color.trim().charAt(0).toUpperCase() +
      variant.color.trim().slice(1).toLowerCase(),
    colorHex: variant.colorCode,
    price: variant.price,
    stockQuantity: variant.stock,
  }));
}
