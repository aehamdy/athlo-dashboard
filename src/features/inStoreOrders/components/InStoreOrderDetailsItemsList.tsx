import { lazy, Suspense } from 'react';
import type { InStoreOrderDetailsT, InStoreOrderItem } from '../types';
import Icon from '@/components/shared/Icon';
import Heading from '@/components/shared/Heading';
import Currency from '@/components/shared/Currency';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
// Lazy-load Invoice so @react-pdf/renderer is only fetched when the dialog opens
const Invoice = lazy(() => import('@/components/invoice/Invoice'));

type InStoreOrderDetailsItemsListProps = {
  order: InStoreOrderDetailsT;
};

function InStoreOrderDetailsItemsList({
  order,
}: InStoreOrderDetailsItemsListProps) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex justify-between items-center pb-sm border-b">
        <div className="flex items-center gap-sm">
          <Icon name="Package" className="text-gray-400" />

          <Heading
            as="h3"
            className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
          >
            Products
          </Heading>
        </div>

        <Dialog>
          <DialogTrigger className="py-1 px-2 text-xs bg-light hover:bg-accent-soft border border-accent-soft rounded-md duration-normal cursor-pointer">
            Preview Invoice
          </DialogTrigger>

          <DialogContent className="sm:max-w-175 p-0 m-0">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="w-9/10 my-5 mx-auto">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-125">
                    <div className="w-8 h-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                  </div>
                }
              >
                <Invoice order={order} />
              </Suspense>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ul className="py-sm space-y-sm max-h-117.5 lg:max-h-80 overflow-y-auto">
        {order.items.map((product: InStoreOrderItem) => (
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
