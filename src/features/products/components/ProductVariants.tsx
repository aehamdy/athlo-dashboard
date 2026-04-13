import Heading from '@/components/shared/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { STOCK_QUANTITY_RULES } from '../constants';
import type { ProductVariant } from '../types';
import ProductVariantCard from './ProductVariantCard';

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
                  <ProductVariantCard variant={variant} />
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
