import Currency from '@/components/shared/Currency';
import type { ProductVariant } from '@/features/products/types';

type OrderSummaryProps = {
  selectedItems: ProductVariant[];
};

function OrderTotals({ selectedItems }: OrderSummaryProps) {
  return (
    <div className="space-y-base">
      <div className="flex justify-between items-center">
        <div>Subtotal</div>

        <div className="flex items-center gap-sm">
          <span>
            <Currency symbol />
          </span>

          <span>
            {selectedItems
              ?.reduce(
                (acc, cur) =>
                  acc + (cur.price ?? 0) * (cur.requestedQuantity ?? 0),
                0,
              )
              .toLocaleString('en-GB')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>Total Items</div>

        <span>
          {selectedItems?.reduce(
            (acc, curr) => acc + (curr?.requestedQuantity ?? 0),
            0,
          )}
        </span>
      </div>

      <hr />

      <div className="flex justify-between items-center font-semibold">
        <span className="">Total </span>

        <div className="flex items-center gap-sm">
          <span className="">
            <Currency symbol />
          </span>

          <span className="">
            {selectedItems
              ?.reduce(
                (acc, cur) =>
                  acc + (cur.price ?? 0) * (cur.requestedQuantity ?? 0),
                0,
              )
              .toLocaleString('en-GB')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderTotals;
