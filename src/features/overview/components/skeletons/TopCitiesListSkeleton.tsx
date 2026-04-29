import { Skeleton } from '@/components/ui/skeleton';

function TopCitiesListSkeleton() {
  return (
    <div className="h-full gap-sm space-y-sm py-xl px-md bg-gray-100 rounded-md">
      {/* Header */}
      <div>
        <div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="h-content overflow-hidden">
        <ul className="h-[300px] space-y-sm overflow-y-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="flex flex-col gap-xs p-sm rounded-md bg-light-muted"
            >
              {/* Top row */}
              <div className="flex justify-between items-center text-sm">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-8" />
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-light-subtle rounded-md overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>

              {/* Bottom count */}
              <div className="flex justify-end">
                <Skeleton className="h-3 w-20" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopCitiesListSkeleton;
