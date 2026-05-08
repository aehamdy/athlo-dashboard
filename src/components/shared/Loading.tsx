import { Skeleton } from '../ui/skeleton';
import { Spinner } from '../ui/spinner';
import { TableBody, TableCell, TableRow } from '../ui/table';

type LoadingProps = {
  variant?: 'table';
  rowsCount?: number;
  colsCount?: number;
  size?: 'xs' | 'sm' | 'normal' | 'lg' | 'xl';
};

function Loading({ variant, rowsCount, colsCount, size = 'sm' }: LoadingProps) {
  const sekeletonColor = 'bg-neutral-100';
  const loadingSize =
    size === 'xs'
      ? 'w-regular h-regular'
      : size === 'sm'
        ? 'w-xl h-xl'
        : size === 'normal'
          ? 'w-4xl h-4xl'
          : size === 'lg'
            ? 'w-7xl h-7xl'
            : size === 'xl'
              ? 'w-9xl h-9xl'
              : 'w-base h-base';

  if (variant === 'table' && rowsCount && colsCount) {
    return (
      <TableBody>
        {Array.from({ length: rowsCount }).map((_, idx) => (
          <TableRow key={idx}>
            {Array.from({ length: colsCount }).map((_, idx) => (
              <TableCell key={idx} className="">
                <Skeleton className="h-4 mt-1 bg-gray-200" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
  return (
    <div className="h-1/2 rounded-xl">
      {size && (
        <div className="flex justify-center items-center">
          <Spinner className={`${loadingSize} text-gray-500`} />
        </div>
      )}

      {variant === 'table' && (
        <div className="flex flex-col gap-6 p-compact lg:p-regular bg-light rounded-xl overflow-hidden">
          <div className="flex flex-col gap-2 w-full h-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className={`h-[73px] lg:h-[35px] p-compact ${sekeletonColor} first:rounded-b-none not-first:rounded-none`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Loading;
