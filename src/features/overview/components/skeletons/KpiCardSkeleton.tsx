import { Skeleton } from '@/components/ui/skeleton';

function KpiCardSkeleton() {
  return (
    <div className="flex flex-col gap-base p-md rounded-md overflow-hidden h-full">
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-[130px]" />

          <Skeleton className="size-10 shrink-0 rounded-full" />
        </div>

        <Skeleton className="h-5 w-[120px]" />

        <div className="flex flex-col gap-sm">
          <Skeleton className="h-3 w-[160px]" />

          <Skeleton className="h-3 w-[140px]" />
        </div>
      </div>
    </div>
  );
}

export default KpiCardSkeleton;
