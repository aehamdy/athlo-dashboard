import { Badge } from '@/components/ui/badge';
import type { ProductVariant } from '../types';
import getStockStatus from '../utils/getStockStatus';
import { Button } from '@/components/ui/button';
import Icon from '@/components/shared/Icon';
import Currency from '@/components/shared/Currency';

type ProductVariantCardProps = {
  variant: ProductVariant;
};

function ProductVariantCard({ variant }: ProductVariantCardProps) {
  console.log(variant);
  return (
    <article className="p-sm border rounded-md overflow-hidden">
      <div className="flex justify-between items-stretch gap-xs">
        <div className="flex flex-col gap-sm flex-1">
          {/* Header */}
          <header className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-400">
              {variant.sku}
            </span>

            <Badge
              className={`${getStockStatus(variant.stockQuantity)?.className} rounded-sm`}
            >
              {getStockStatus(variant.stockQuantity)?.label}
            </Badge>
          </header>

          {/* Attributes */}
          <div className="flex flex-wrap items-center gap-xs text-xs">
            {/* Variant Label (size, weight, etc) */}
            {variant.attributeValueEn && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                <span className="font-medium">{variant.attributeValueEn}</span>

                {variant.unit && (
                  <span className="text-gray-500">{variant.unit}</span>
                )}
              </div>
            )}

            {/* Color */}
            {variant.colorLabel && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                <span className="font-medium">{variant.colorLabel}</span>

                {variant.colorHex && (
                  <span
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Pricing + Stock */}
          <footer className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-xs">
              <span className="font-medium">{variant.priceAfterDiscount}</span>

              {variant.price !== variant.priceAfterDiscount && (
                <span className="line-through">
                  <Currency /> {variant.price}
                </span>
              )}

              <Currency className="text-neutral-muted" />
            </div>

            <span className="text-xs text-gray-500">
              Qty: {variant.stockQuantity}
            </span>
          </footer>
        </div>
      </div>
    </article>
  );
}

export default ProductVariantCard;
