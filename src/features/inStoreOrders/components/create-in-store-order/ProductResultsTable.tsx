import Currency from '@/components/shared/Currency';
import Heading from '@/components/shared/Heading';
import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import type { ProductVariant } from '@/features/products/types';
import type { ProductWithVariants } from '@/features/inStoreOrders/types';

import React from 'react';
import ProductVariantAttributes from '../ProductVariantAttributes';
import Loading from '@/components/shared/Loading';

interface Props {
  product: ProductWithVariants;
  setSelectedItems: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  isLoading: boolean;
}

function ProductResultsTable({ product, setSelectedItems, isLoading }: Props) {
  if (isLoading) {
    return <Loading />;
  }

  const handleAddItem = (variant: ProductVariant) => {
    setSelectedItems((prev: ProductVariant[]) => {
      const existingItem = prev.find((item) => item.id === variant.id);

      if (existingItem) {
        return prev.map((item) => {
          return item.id === variant.id
            ? { ...item, requestedQuantity: (item.requestedQuantity ?? 0) + 1 }
            : item;
        });
      }

      return [
        ...prev,
        {
          ...variant,
          productName: product?.name,
          requestedQuantity: 1,
        },
      ];
    });
  };

  return (
    <div className="space-y-sm">
      <Heading as="h5">Search Results</Heading>

      <div className="max-h-[300px] overflow-y-auto border rounded-md">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-100 shadow-md z-10">
            <tr className="font-medium text-xs md:text-sm text-gray-400">
              <td className="md:p-sm">Product Variant</td>
              <td className="md:p-sm text-center">SKU</td>
              <td className="md:p-sm text-center">Unit Price</td>
              <td className="md:p-sm text-center">Quantity</td>
              <td className="md:p-sm text-center">Actions</td>
            </tr>
          </thead>

          <tbody>
            {product?.variants?.map((variant: ProductVariant) => (
              <tr
                key={variant.id}
                className="w-full py-sm space-y-sm min-h-27.5 lg:min-h-32.5 text-sm text-gray-400 hover:bg-gray-100 border-b border-gray-100 overflow-y-auto"
              >
                <td className="flex flex-col items-start p-sm m-0">
                  <div className="font-semibold text-gray-800">
                    {product?.name}
                  </div>

                  <ProductVariantAttributes
                    attributeValueEn={variant.attributeValueEn}
                    unit={variant.unit}
                    colorLabel={variant.colorLabel}
                  />
                </td>

                <td className="p-sm text-center font-medium text-xs">
                  {variant?.sku}
                </td>

                <td className="p-sm font-medium">
                  <div className="flex items-center gap-sm">
                    <Currency symbol />

                    {variant?.price}
                  </div>
                </td>

                <td className="p-sm text-center font-medium">
                  {variant?.stockQuantity}
                </td>

                <td className="p-sm text-end">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={variant.stockQuantity < 1}
                    onClick={() => handleAddItem(variant)}
                    className="flex items-center ms-auto disabled:bg-gray-100"
                  >
                    <span className="">
                      <Icon name="Plus" />
                    </span>

                    <span className="hidden md:block">Add</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductResultsTable;
