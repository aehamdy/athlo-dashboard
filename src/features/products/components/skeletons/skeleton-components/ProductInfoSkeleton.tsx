import { Skeleton } from '@/components/ui/skeleton';

function ProductInfoSkeleton() {
  return (
    <section className="space-y-md p-base border-b">
      {/* Product name & description */}
      <div className="space-y-md">
        <Skeleton className="h-3 w-20" />

        <div className="space-y-sm">
          <Skeleton className="h-3 w-9/10" />
          <Skeleton className="h-3 w-6/10 " />
        </div>
      </div>

      {/* Product price, variants, and code */}
      <div className="grid grid-cols-3 gap-sm pt-md border-t">
        <div className="flex flex-col gap-sm p-sm bg-gray-100 rounded-md">
          <Skeleton className="h-3 w-20" />

          <Skeleton className="h-3 w-20" />
        </div>

        <div className="flex flex-col gap-sm p-sm bg-gray-100 rounded-md">
          <Skeleton className="h-3 w-20" />

          <Skeleton className="h-3 w-20" />
        </div>

        <div className="flex flex-col gap-sm p-sm bg-gray-100 rounded-md">
          <Skeleton className="h-3 w-20" />

          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Product brand, category, and club */}
      <div className="pt-md space-y-sm border-t">
        <Skeleton className="h-3 w-20" />

        <div className="flex flex-col gap-sm">
          <div className="flex justify-between items-center py-sm px-md border-b border-gray-100">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>

          <div className="flex justify-between items-center py-sm px-md border-b border-gray-100">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>

          <div className="flex justify-between items-center py-sm px-md border-b border-gray-100">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInfoSkeleton;
