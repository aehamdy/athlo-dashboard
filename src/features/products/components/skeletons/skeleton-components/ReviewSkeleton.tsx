import { Skeleton } from '@/components/ui/skeleton';

function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-sm p-sm">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />

        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-8/10 " />
      <Skeleton className="h-3 w-5/10 " />

      <Skeleton className="ms-auto h-3 w-15 " />
    </div>
  );
}

export default ReviewSkeleton;
