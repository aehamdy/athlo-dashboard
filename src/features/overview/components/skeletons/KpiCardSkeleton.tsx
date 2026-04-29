import { Skeleton } from '@/components/ui/skeleton';

function KpiCardSkeleton() {
  return (
    <div className="flex flex-col gap-base p-md bg-gray-100 rounded-md overflow-hidden h-full">
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[100px]" />

          <Skeleton className="size-7 shrink-0 rounded-md" />
        </div>

        <Skeleton className="h-5 w-[80px]" />

        <Skeleton className="h-3 w-[130px]" />
      </div>
    </div>
  );
}

export default KpiCardSkeleton;
