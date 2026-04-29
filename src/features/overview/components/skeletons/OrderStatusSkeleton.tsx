import { Skeleton } from '@/components/ui/skeleton';

function OrderStatusSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 h-full p-md bg-gray-100 rounded-md">
      {/* Donut */}
      <div className="relative flex items-center justify-center">
        {/* Outer circle */}
        <Skeleton className="h-[180px] w-[180px] rounded-full" />

        {/* Inner hole */}
        <div className="absolute flex flex-col items-center justify-center">
          {/* Fake hole */}
          <Skeleton className="absolute h-[90px] w-[90px] rounded-full bg-background" />

          {/* Center text */}
          <div className="relative flex flex-col items-center gap-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[220px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderStatusSkeleton;
