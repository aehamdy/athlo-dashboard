import useDeleteProductVariant from '../hooks/useDeleteProductVariant';
import { Button } from '@/components/ui/button';
import Icon from '@/components/shared/Icon';
import type { ProductVariant } from '../types';
import getStockStatus from '../utils/getStockStatus';
import { Badge } from '@/components/ui/badge';
import Currency from '@/components/shared/Currency';
import EditVariantDialog from './forms/EditVariantDialog';

type ProductVariantCardProps = {
  variant: ProductVariant;
  productId: number;
};

function ProductVariantCard({ variant, productId }: ProductVariantCardProps) {
  const deleteMutation = useDeleteProductVariant(productId);

  const handleDelete = () => {
    deleteMutation.mutate(variant.id);
  };

  return (
    <article className="p-sm border rounded-md overflow-hidden">
      <div className="flex justify-between items-stretch gap-xs">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between gap-sm flex-1">
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
                <span className="font-medium">
                  {' '}
                  {variant.attributeValueEn}{' '}
                </span>
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
              <span className="font-medium">
                {' '}
                {variant.priceAfterDiscount}{' '}
              </span>
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

        {/* ACTIONS */}
        <div className="flex flex-col justify-between">
          {/* DELETE */}
          <Button
            variant="plain"
            size="icon"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="group bg-gray-100"
          >
            <Icon
              name="Trash2"
              className="text-gray-500 group-hover:text-red-500 transition-colors duration-normal"
            />
          </Button>

          <EditVariantDialog variant={variant} productId={productId} />
        </div>
      </div>
    </article>
  );
}

export default ProductVariantCard;
