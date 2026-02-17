import type { ReactNode } from "react";

type AppGridProps = {
  children: ReactNode;
};

export default function AppGrid({ children }: AppGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-base h-[80dvh] lg:h-[75vh] 2xl:h-[78vh] px-[5px] overflow-y-auto scrollbar-thin">
      {children}
    </section>
  );
}
