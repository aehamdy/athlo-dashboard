import type { ReactNode } from "react";

type ListProps = {
  children: ReactNode;
  variant?: "table";
};

function List({ children, variant }: ListProps) {
  return (
    <div
      className={`${variant === "table" ? "" : "scrollbar-thin grid grid-cols-2 auto-rows-min gap-base h-[65dvh] lg:h-[60vh] 2xl:h-[78vh] px-[5px] overflow-y-auto"}`}
    >
      {children}
    </div>
  );
}

export default List;
