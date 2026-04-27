import { Skeleton } from '@/components/ui/skeleton';

function RatingsOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-md py-xl px-md bg-gray-100 rounded-md">
      <div className="flex justify-between">
        <Skeleton className="w-[100px] h-3" />

        <Skeleton className="w-[50px] h-3" />
      </div>

      <div className="flex flex-col gap-sm">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-xs">
            <Skeleton className="w-3 h-3" />

            <Skeleton className="w-14 h-3" />

            <Skeleton className="w-36 h-3" />
          </div>
        ))}
      </div>

      <div className="">
        <Skeleton className="w-16 h-3" />
      </div>
    </div>
  );
}

export default RatingsOverviewSkeleton;
