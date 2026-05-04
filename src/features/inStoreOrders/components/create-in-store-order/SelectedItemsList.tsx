import Currency from '@/components/shared/Currency';
import Heading from '@/components/shared/Heading';
import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import type { ProductVariant } from '@/features/products/types';

import React from 'react';
import ProductVariantAttributes from '../ProductVariantAttributes';

interface Props {
  selectedItems: ProductVariant[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
}

function SelectedItemsList({ selectedItems, setSelectedItems }: Props) {
  const handleRemoveItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.filter((item: ProductVariant) => item.id !== id),
    );
  };

  const handleUpdateQuantity = (
    id: number,
    action: 'increment' | 'decrement',
  ) => {
    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (action === 'increment')
            return {
              ...item,
              requestedQuantity: (item.requestedQuantity ?? 0) + 1,
            };
          if (action === 'decrement')
            return {
              ...item,
              requestedQuantity: (item.requestedQuantity ?? 0) - 1,
            };
        }
        return item;
      }),
    );
  };

  return (
    <div className="">
      <div className="flex items-center gap-xs py-compact border-b">
        <Icon name="ShoppingBasket" size={26} />

        <div className="flex items-center gap-sm">
          <Heading as="h5">Selected Items</Heading>

          <span>({selectedItems?.length})</span>
        </div>
      </div>

      {/* List of selected items */}
      <ul className="max-h-[335px] bg-gray-50 overflow-y-auto">
        {selectedItems?.map((item: ProductVariant) => (
          <li key={item.id} className="p-compact not-last:border-b">
            <div className="flex flex-col gap-xs w-full">
              <div className="flex justify-between items-start gap-xs w-full">
                <div className="flex flex-col">
                  <span className="block max-w-60 truncate font-medium">
                    {item.productName}
                  </span>

                  {/* <div className="flex items-center gap-1 ms-xs text-sm text-gray-400">
                    {item.attributeValueEn && (
                      <span className="">{item.attributeValueEn}</span>
                    )}

                    {item.attributeValueEn &&
                      (item.unit || item.colorLabel) && (
                        <span className="">/</span>
                      )}

                    {item.unit && <span className="">{item.unit}</span>}

                    {item.unit && item.colorLabel && (
                      <span className="">/</span>
                    )}

                    {item.colorLabel && (
                      <span className="">{item.colorLabel}</span>
                    )}
                  </div> */}
                  <ProductVariantAttributes
                    attributeValueEn={item.attributeValueEn}
                    unit={item.unit}
                    colorLabel={item.colorLabel}
                  />
                </div>

                <div className="">
                  <span className="flex items-center gap-tiny text-gray-400">
                    <span>
                      <Currency symbol />
                    </span>

                    <span>{item.price?.toLocaleString('en-GB')}</span>
                  </span>
                </div>
              </div>

              {/* Quantity selector and remove button */}
              <div className="flex justify-between items-center gap-xs w-full">
                <div className="flex items-center text-gray-400 bg-light border rounded-md overflow-hidden">
                  <Button
                    variant="plain"
                    size="sm"
                    className="flex items-center ms-auto text-gray-500 hover:text-black active:text-black hover:bg-accent/70 active:bg-accent disabled:text-gray-400 disabled:bg-gray-100 rounded-none"
                    disabled={item.requestedQuantity === 1}
                    onClick={() => handleUpdateQuantity(item.id, 'decrement')}
                  >
                    <span>
                      <Icon name="Minus" className="text-current" />
                    </span>
                  </Button>

                  <span className="px-xs font-medium text-gray-700">
                    {item.requestedQuantity}
                  </span>

                  <Button
                    variant="plain"
                    size="sm"
                    className="flex items-center ms-auto text-gray-500 hover:text-black active:text-black hover:bg-accent/70 active:bg-accent disabled:text-gray-400 disabled:bg-gray-100 rounded-none"
                    disabled={item.requestedQuantity === item.stockQuantity}
                    onClick={() => handleUpdateQuantity(item.id, 'increment')}
                  >
                    <span>
                      <Icon name="Plus" className="text-current" />
                    </span>
                  </Button>
                </div>

                <Button
                  variant="icon"
                  size="sm"
                  className="flex items-center ms-auto text-gray-400 hover:text-red-500 bg-gray-100"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Icon name="Trash2" className="text-current" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedItemsList;
