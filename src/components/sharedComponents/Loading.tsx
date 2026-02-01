import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

type LoadingProps = {
  variant?: "table";
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
};

function Loading({ variant, size }: LoadingProps) {
  const sekeletonColor = "bg-neutral-100";
  const loadingSize =
    size === "xs"
      ? "w-regular h-regular"
      : size === "sm"
        ? "w-xl h-xl"
        : size === "normal"
          ? "w-4xl h-4xl"
          : size === "lg"
            ? "w-7xl h-7xl"
            : size === "xl"
              ? "w-9xl h-9xl"
              : "w-base h-base";

  return (
    <div className="h-full p-compact bg-light rounded-xl">
      {size && (
        <div className="flex justify-center items-center h-[calc(100dvh-9rem)]">
          <Spinner className={`${loadingSize} text-accent`} />
        </div>
      )}

      {variant === "table" && (
        <div className="flex flex-col gap-6 h-full p-compact lg:p-regular bg-light rounded-xl overflow-hidden">
          <div className="flex justify-between items-center h-[36px]">
            <Skeleton
              className={`w-[130px] h-full p-compact ${sekeletonColor}`}
            />
            <Skeleton
              className={`w-[105px] h-full p-compact ${sekeletonColor}`}
            />
          </div>

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
