import type { VariantType } from '../products.schema';

export function transformVariants(variants: VariantType[]) {
  return variants.map((variant) => ({
    attributeValueEn: variant.attributeValueEn?.trim().toUpperCase(),
    attributeValueAr: variant.attributeValueAr?.trim().toUpperCase(),
    unit: variant.unit?.trim().toUpperCase(),
    colorLabel: variant.colorName
      ? variant.colorName.trim().charAt(0).toUpperCase() +
        variant.colorName.trim().slice(1).toLowerCase()
      : undefined,
    colorHex: variant.colorCode?.trim().slice(0, 7),
    price: variant.price,
    stockQuantity: variant.stockQuantity,
  }));
}
