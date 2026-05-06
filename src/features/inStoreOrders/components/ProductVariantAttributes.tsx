type ProductVariantAttributesProps = {
  attributeValueEn?: string | null;
  unit?: string | null;
  colorLabel?: string | null;
};

function ProductVariantAttributes({
  attributeValueEn,
  unit,
  colorLabel,
}: ProductVariantAttributesProps) {
  const values = [attributeValueEn, unit, colorLabel].filter(Boolean);

  return (
    <div className="flex items-center ms-tiny text-gray-400">
      {values.join(' / ')}
    </div>
  );
}

export default ProductVariantAttributes;
