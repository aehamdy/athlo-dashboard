import type { ReactNode } from "react";

type ListProps = {
  children: ReactNode;
};

function List({ children }: ListProps) {
  return (
    <ul className="scrollbar-thin grid lg:grid-cols-2 auto-rows-min gap-base max-h-[414px] px-[5px] overflow-y-auto">
      {children}
    </ul>
  );
}

export default List;
