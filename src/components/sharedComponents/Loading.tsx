import { Spinner } from "../ui/spinner";

type LoadingProps = {
  size: "xs" | "sm" | "normal" | "lg" | "xl";
};

function Loading({ size }: LoadingProps) {
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
    <div className="flex justify-center items-center h-[calc(100dvh-9rem)]">
      <Spinner className={`${loadingSize} text-accent`} />
    </div>
  );
}

export default Loading;
