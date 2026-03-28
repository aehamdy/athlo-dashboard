import Heading from '@/components/shared/Heading';
import Icon from '@/components/shared/Icon';
import type { ProductDetails } from '../types';

function ProductGeneralInfo({ product }: { product: ProductDetails }) {
  const hasPriceRange = product.maxPrice > product.minPrice;
  const hasDiscount =
    product.minPriceAfterDiscount < product.minPrice ||
    product.maxPriceAfterDiscount < product.maxPrice;

  return (
    <section className="space-y-md p-base border-b">
      {/* Product name & description */}
      <div>
        <h5 className="font-semibold text-lg">
          {product.nameEn || product.nameAr}
        </h5>

        <p className="text-sm text-muted-foreground">
          {product.descriptionEn || product.descriptionAr}
        </p>
      </div>

      {/* Product price, variants, and code */}
      <div className="grid grid-cols-3 gap-sm pt-md border-t">
        <div className="flex flex-col justify-between gap-sm p-sm bg-gray-100 rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-[10px] md:text-xs text-neutral-400 tracking-widest"
          >
            PRICE
          </Heading>

          <div
            className={`flex items-center gap-sm font-semibold ${hasDiscount ? 'text-xs text-gray-400 line-through' : 'text-sm text-gray-700'}`}
          >
            {hasPriceRange ? (
              <>
                <p className="text-md">{product.minPrice} &pound;</p>
                <span className="">-</span>
                <p className="text-md">{product.maxPrice} &pound;</p>
              </>
            ) : (
              <p className="text-md">{product.basePrice} &pound;</p>
            )}
          </div>

          {hasDiscount && (
            <div
              className={`flex items-center gap-sm font-semibold text-sm text-red-500 ${product.minPriceAfterDiscount < product.minPrice || product.maxPriceAfterDiscount < product.maxPrice ? 'block' : 'hidden'}`}
            >
              <p className="text-md">{product.minPriceAfterDiscount} &pound;</p>
              <span className="">-</span>
              <p className="text-md">{product.maxPriceAfterDiscount} &pound;</p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-sm p-sm bg-gray-100 rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-[10px] md:text-xs text-neutral-400 tracking-widest"
          >
            VARIANTS
          </Heading>

          <p className="font-semibold text-sm text-gray-700">
            {product.variants?.length || 0}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-sm p-sm bg-gray-100 rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-[10px] md:text-xs text-neutral-400 tracking-widest"
          >
            PRODUCT CODE
          </Heading>

          <p className="font-semibold text-sm text-gray-700">{product.code}</p>
        </div>
      </div>

      {/* Product brand, category, and club */}
      <div className="pt-md space-y-sm border-t">
        <Heading
          as="h5"
          className="flex items-center gap-sm font-semibold text-xs md:text-xs text-neutral-400 tracking-widest"
        >
          <Icon name="Info" className="text-neutral-400" /> GENERAL INFORMATION
        </Heading>

        <div className="flex flex-col gap-sm">
          <div className="flex justify-between items-center py-sm px-md border-b border-gray-100">
            <Heading
              as="h6"
              className="font-semibold text-xs md:text-xs text-neutral-400 tracking-widest"
            >
              Brand
            </Heading>
            <p className="font-semibold text-sm text-gray-700">
              {product.brandNameEn}
            </p>
          </div>

          <div className="flex justify-between items-center py-sm px-md border-b border-gray-100">
            <Heading
              as="h6"
              className="font-semibold text-xs md:text-xs text-neutral-400 tracking-widest"
            >
              Category
            </Heading>
            <p className="font-semibold text-sm text-gray-700">
              {product.categoryNameEn}
            </p>
          </div>

          {product.clubEn && (
            <div className="flex justify-between items-center py-sm px-md border-b border-gray-100">
              <Heading
                as="h6"
                className="font-semibold text-xs md:text-xs text-neutral-400 tracking-widest"
              >
                Club
              </Heading>
              <p className="font-semibold text-sm text-gray-700">
                {product.clubEn}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductGeneralInfo;
