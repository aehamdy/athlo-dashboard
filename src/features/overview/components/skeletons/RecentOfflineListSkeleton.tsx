import { Skeleton } from '@/components/ui/skeleton';

function RecentOfflineListSkeleton() {
  return (
    <div className="h-full gap-sm space-y-sm py-xl px-md bg-gray-100 rounded-md">
      {/* Header */}
      <div className="ps-sm">
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Content */}
      <div className="px-sm">
        <ul className="space-y-sm">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex justify-between items-start gap-sm p-sm bg-light-muted rounded-md"
            >
              {/* Left side */}
              <div className="flex flex-col gap-tiny text-sm">
                {/* Sale number */}
                <Skeleton className="h-3 w-28" />

                {/* Date */}
                <Skeleton className="h-3 w-32" />
              </div>

              {/* Right side (amount) */}
              <div className="flex items-center gap-tiny">
                <Skeleton className="h-3 w-16" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentOfflineListSkeleton;
