import { Skeleton } from '@/components/ui/skeleton';

function TopProductsListSkeleton() {
  return (
    <div className="flex flex-col gap-sm space-y-sm py-xl px-md bg-gray-100 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center ps-sm space-y-sm py-xl px-md bg-gray-100 rounded-md">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-24" />
      </div>

      {/* List */}
      <div className="px-sm">
        <ul className="h-[230px] overflow-auto space-y-sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="flex justify-between items-start gap-sm p-sm bg-light-muted rounded-md"
            >
              {/* Left side */}
              <div className="flex items-start gap-sm">
                {/* Image */}
                <Skeleton className="w-10 h-10 rounded-md" />

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Revenue */}
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

export default TopProductsListSkeleton;
