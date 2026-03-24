import { Skeleton } from '@/components/ui/skeleton';

function ProductImageSkeleton() {
  return (
    <section className="p-sm border-b">
      <div className="h-50 grid grid-cols-3 gap-sm">
        <Skeleton className="col-span-2 h-full" />

        <div className="col-span-1 flex flex-col gap-sm h-full overflow-y-auto">
          <Skeleton className="h-4/10" />
          <Skeleton className="h-4/10" />
          <Skeleton className="h-4/10" />
        </div>
      </div>
    </section>
  );
}

export default ProductImageSkeleton;
