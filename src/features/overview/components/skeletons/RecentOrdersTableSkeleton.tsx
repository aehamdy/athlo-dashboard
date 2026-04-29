import { Skeleton } from '@/components/ui/skeleton';

function RecentOrdersTableSkeleton() {
  return (
    <div className="h-full flex flex-col gap-sm space-y-sm py-xl px-md bg-gray-100 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />

        <Skeleton className="h-3 w-24" />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-2 border-b pb-2 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-5 items-center gap-2 py-2 px-1 bg-light-muted rounded-md"
            >
              {/* Order ID */}
              <Skeleton className="h-3 w-12 mx-auto" />

              {/* Customer */}
              <Skeleton className="h-3 w-20 mx-auto" />

              {/* Date */}
              <Skeleton className="h-3 w-16 mx-auto" />

              {/* Status */}
              <div className="flex justify-center">
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>

              {/* Total */}
              <Skeleton className="h-3 w-14 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentOrdersTableSkeleton;
