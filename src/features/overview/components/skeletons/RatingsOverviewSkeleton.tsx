import { Skeleton } from '@/components/ui/skeleton';

function RatingsOverviewSkeleton() {
  return (
    <div className="h-full space-y-sm py-xl px-md bg-gray-100 rounded-md">
      <div className="flex flex-col gap-sm">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />

          <div className="flex items-center gap-xs">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>

        {/* Distribution (5 rows) */}
        <ul className="flex flex-col gap-lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="flex items-center gap-xs">
              {/* Stars label */}
              <div className="flex items-center gap-xs w-10">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>

              {/* Progress bar */}
              <div className="flex-1 h-2 rounded-md overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>

              {/* Percentage */}
              <div className="w-10 flex justify-end">
                <Skeleton className="h-3 w-8" />
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-md">
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
}

export default RatingsOverviewSkeleton;
