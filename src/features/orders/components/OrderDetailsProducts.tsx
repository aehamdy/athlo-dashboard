import { lazy, Suspense } from 'react';
import Heading from '@/components/shared/Heading';
import type { OrderDetails } from '../types';
import Icon from '@/components/shared/Icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// Lazy-load Invoice so @react-pdf/renderer is only fetched when the dialog opens
const Invoice = lazy(() => import('@/components/invoice/Invoice'));

type OrderDetailsProductsProps = {
  order: OrderDetails;
};

function OrderDetailsProducts({ order }: OrderDetailsProductsProps) {
  if (!order) return <p>No products in this order.</p>;

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

        <div>
          <Dialog>
            <DialogTrigger className="py-1 px-2 text-xs bg-light hover:bg-accent-soft border border-accent-soft rounded-md duration-normal cursor-pointer">
              Preview Invoice
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] p-0 m-0">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <div className="w-9/10 my-5 mx-auto">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-[500px]">
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
      </div>

      <ul className="py-sm space-y-sm min-h-27.5 lg:min-h-32.5 overflow-y-auto">
        {order.items.map((product) => (
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

            {/* Quantity & Unit Price */}
            <div className="flex justify-between items-center text-xs">
              <span>Quantity: {product.quantity}</span>

              <span>
                Unit Price: &pound;{product.unitPrice.toLocaleString('en-GB')}
              </span>

              <span className="font-medium">
                Total: &pound;{product.totalPrice.toLocaleString('en-GB')}
              </span>
            </div>

            {/* Attributes */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1 text-xs">
                {product.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded"
                  >
                    {/* If attribute has color */}
                    {attr.type === 'Color' && attr.colorHex && (
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: attr.colorHex }}
                      />
                    )}
                    <span className="text-xs">
                      {attr.keyEn}: {attr.valueEn}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetailsProducts;
