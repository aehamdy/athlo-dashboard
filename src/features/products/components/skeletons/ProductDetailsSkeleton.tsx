import { Skeleton } from '@/components/ui/skeleton';
import ProductImageSkeleton from './skeleton-components/ProductImageSkeleton';
import ProductInfoSkeleton from './skeleton-components/ProductInfoSkeleton';

function ProductDetailsSkeleton() {
  return (
    <section className="">
      <section className="h-full">
        <ProductImageSkeleton />

        <ProductInfoSkeleton />

        <div className="space-y-md p-sm">
          {/* Prodcut variants skeleton */}
          <Skeleton className="h-10 w-full rounded-sm" />

          {/* Prodcut reviews skeleton */}
          <Skeleton className="h-10 w-full rounded-sm" />
        </div>
      </section>
    </section>
  );
}

export default ProductDetailsSkeleton;
