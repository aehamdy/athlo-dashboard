import type { InStoreOrderItem } from '../types';
import Icon from '@/components/shared/Icon';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import Currency from '@/components/shared/Currency';

type InStoreOrderDetailsItemsListProps = {
  items: InStoreOrderItem[];
};

function InStoreOrderDetailsItemsList({
  items,
}: InStoreOrderDetailsItemsListProps) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex justify-between items-center border-b">
        <div className="flex items-center gap-sm">
          <Icon name="Package" className="text-gray-400" />

          <Heading
            as="h3"
            className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
          >
            Products
          </Heading>
        </div>

        <div className="p-compact">
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="w-full text-tiny cursor-not-allowed"
          >
            Download Invoice
          </Button>
        </div>
      </div>

      <ul className="py-sm space-y-sm max-h-[470px] lg:max-h-61 overflow-y-auto">
        {items.map((product: InStoreOrderItem) => (
          <li
            key={product.productVariantId + product.sku}
            className="flex flex-col gap-sm p-compact bg-gray-50 hover:bg-gray-100 border rounded-md transition-colors duration-normal"
          >
            {/* Top Row: Name + SKU */}
            <div className="flex justify-between items-center">
              <Heading as="h3" className="font-semibold text-sm md:text-sm">
                {product.productName}
              </Heading>

              <span className="text-xs text-gray-400">{product.sku}</span>
            </div>

            <div className="flex items-center gap-sm">
              <div className="flex items-center gap-tiny p-tiny bg-gray-200 rounded-md">
                <span>Size:</span>

                <span>{product.attributeValue}</span>
              </div>

              <div className="flex items-center gap-tiny p-tiny bg-gray-200 rounded-md">
                <span>Color:</span>

                <span className="flex items-center gap-tiny">
                  {product.color}
                </span>
              </div>
            </div>

            {/* Quantity & Unit Price & Item Total Price */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-xs">
                <span>Unit Price:</span>

                <span className="flex items-center gap-tiny">
                  <Currency symbol />{' '}
                  {product.unitPrice.toLocaleString('en-GB')}
                </span>
              </div>

              <span>Quantity: {product.quantity}</span>

              <div className="flex items-center gap-xs font-semibold">
                <span>Total:</span>

                <span className="flex items-center gap-tiny">
                  <Currency symbol />{' '}
                  {product.totalPrice.toLocaleString('en-GB')}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InStoreOrderDetailsItemsList;
