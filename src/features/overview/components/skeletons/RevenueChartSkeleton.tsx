import { Skeleton } from '@/components/ui/skeleton';

function RevenueChartSkeleton() {
  const bars = Array.from({ length: 10 });
  return (
    <div className="flex flex-col h-full p-md bg-gray-100 rounded-md">
      <div className="flex flex-col gap-sm">
        <Skeleton className="w-[180px] h-3" />
        <Skeleton className="w-[100px] h-3" />
      </div>

      <div className="w-full h-[250px] flex items-end justify-between gap-2 px-2">
        {bars.map((_, index) => {
          const heights = [
            'h-[40%]',
            'h-[65%]',
            'h-[50%]',
            'h-[80%]',
            'h-[55%]',
            'h-[70%]',
            'h-[35%]',
            'h-[90%]',
            'h-[60%]',
            'h-[75%]',
          ];

          return (
            <Skeleton
              key={index}
              className={`w-full ${heights[index]} rounded-sm`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RevenueChartSkeleton;
