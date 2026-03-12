import Heading from "@/components/shared/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useFetchApplicableProducts from "../hooks/useFetchApplicableProducts";
import { useState } from "react";
import type { Product } from "@/features/products/types";
import { Button } from "@/components/ui/button";
import Icon from "@/components/shared/Icon";
import { Skeleton } from "@/components/ui/skeleton";
import AppImage from "@/components/shared/AppImage";

type CouponApplicableProductsProps = {
  couponId: number;
  setIsPickerOpen: (open: boolean) => void;
};

function CouponApplicableProducts({
  couponId,
  setIsPickerOpen,
}: CouponApplicableProductsProps) {
  const [openValue, setOpenValue] = useState<string>();
  const isOpen = openValue === "applicable";
  const { data: products, isLoading } = useFetchApplicableProducts({
    couponId,
    enabled: isOpen,
  });

  return (
    <section className="border-b">
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setOpenValue(value)}
      >
        <AccordionItem value="applicable">
          <AccordionTrigger className="py-compact cursor-pointer">
            <Heading
              as="h5"
              className="font-semibold text-tiny md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Applicable Products
            </Heading>
          </AccordionTrigger>

          <AccordionContent>
            {isLoading ? (
              <div className="flex flex-col gap-regular overflow-y-auto scrollbar-thin">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-12 bg-gray-200 rounded-md"
                    />
                  ))}
              </div>
            ) : !products || products.length === 0 ? (
              <p className="py-sm text-center text-gray-500 bg-gray-100 rounded-sm">
                No products found for this coupon.
              </p>
            ) : (
              <ul className="flex flex-col gap-regular h-[205px] md:min-h-[300px] lg:min-h-[205px] overflow-y-auto scrollbar-thin">
                {products.map((product: Product) => (
                  <li key={product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <AppImage
                        src={product.images[0]}
                        alt={`${product.name} image`}
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-gray-500">${product.basePrice}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {isLoading ? (
              <div className="flex gap-tiny h-10 mt-regular">
                <Skeleton className="flex-1 h-full bg-gray-200" />
                <Skeleton className="flex-1 h-full bg-gray-200" />
              </div>
            ) : (
              <div className="flex gap-tiny mt-regular">
                {products && products.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {}}
                    className="flex-1 flex-items-center gap-xs"
                  >
                    <Icon name="Trash2" />
                    Remove All
                  </Button>
                )}

                <Button
                  onClick={() => setIsPickerOpen(true)}
                  className="flex-1 flex items-center gap-xs"
                >
                  <Icon name="Plus" />
                  Add Product
                </Button>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default CouponApplicableProducts;
