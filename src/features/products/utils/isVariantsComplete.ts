import type { VariantType } from '../products.schema';

const hasValue = (value?: string) => Boolean(value?.trim());

export function isVariantsComplete(variants?: VariantType[]) {
  if (!variants?.length) return false;

  const first = variants[0];

  const firstHasAttributeEn = hasValue(first.attributeValueEn);
  const firstHasAttributeAr = hasValue(first.attributeValueAr);

  const firstHasUnit = hasValue(first.unit);

  const firstHasColorName = hasValue(first.colorName);
  const firstHasColorCode = hasValue(first.colorCode);

  // Attribute values must always come together
  if (firstHasAttributeEn !== firstHasAttributeAr) {
    return false;
  }

  // Color fields must always come together
  if (firstHasColorName !== firstHasColorCode) {
    return false;
  }

  return variants.every((variant) => {
    const hasAttributeEn = hasValue(variant.attributeValueEn);
    const hasAttributeAr = hasValue(variant.attributeValueAr);

    const hasUnit = hasValue(variant.unit);

    const hasColorName = hasValue(variant.colorName);
    const hasColorCode = hasValue(variant.colorCode);

    return (
      // Always required
      variant.price > 0 &&
      variant.stockQuantity > 0 &&
      // Attribute pair must stay together
      hasAttributeEn === hasAttributeAr &&
      hasAttributeEn === firstHasAttributeEn &&
      hasAttributeAr === firstHasAttributeAr &&
      // Unit must match the first variant
      hasUnit === firstHasUnit &&
      // Color pair must stay together
      hasColorName === hasColorCode &&
      hasColorName === firstHasColorName &&
      hasColorCode === firstHasColorCode
    );
  });
}
