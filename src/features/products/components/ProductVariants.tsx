import Heading from '@/components/shared/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import getStockStatus from '../utils/getStockStatus';
import { Badge } from '@/components/ui/badge';
import { STOCK_QUANTITY_RULES } from '../constants';
import type { ProductVariant } from '../types';

function ProductVariants({ variants }: { variants: ProductVariant[] }) {
  return (
    <section className="px-base border-b">
      <Accordion type="single" collapsible>
        <AccordionItem value="variants">
          <AccordionTrigger className="hover:no-underline cursor-pointer">
            <Heading
              as="h5"
              className="flex items-center gap-sm text-base font-semibold"
            >
              Variants{' '}
              <span className="text-gray-400 text-md">({variants.length})</span>
            </Heading>
          </AccordionTrigger>

          <AccordionContent>
            {/* Stock Quantity Badges */}
            <ul className="flex items-center gap-sm mb-md">
              {STOCK_QUANTITY_RULES.map((rule) => (
                <li key={rule.id} className="overflow-hidden">
                  <Badge
                    variant={'outline'}
                    className={`${rule.className} text-xs border-none rounded-sm`}
                  >
                    {rule.label}: {rule.limit}
                  </Badge>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-sm min-h-25 overflow-y-auto">
              {variants.map((variant) => (
                <li key={variant.id}>
                  <article className="p-sm border rounded-md flex flex-col gap-sm">
                    {/* Header */}
                    <header className="flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        {variant.sku}
                      </span>

                      <Badge
                        className={`${getStockStatus(variant.stockQuantity)?.className} rounded-sm`}
                      >
                        {getStockStatus(variant.stockQuantity)?.label}
                      </Badge>
                    </header>

                    {/* Attributes */}
                    <div className="flex flex-wrap gap-xs text-xs">
                      {variant.attributes.map((attr, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded"
                        >
                          <span className="font-medium">{attr.keyEn}:</span>
                          <span>{attr.valueEn}</span>

                          {/* Color preview */}
                          {attr.colorHex && (
                            <span
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: attr.colorHex }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Pricing + Stock */}
                    <footer className="flex justify-between items-center text-sm">
                      <div className="flex gap-xs">
                        <span className="font-medium">
                          £{variant.priceAfterDiscount}
                        </span>

                        {variant.price !== variant.priceAfterDiscount && (
                          <span className="line-through text-gray-400">
                            £{variant.price}
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-gray-500">
                        Qty: {variant.stockQuantity}
                      </span>
                    </footer>
                  </article>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default ProductVariants;
