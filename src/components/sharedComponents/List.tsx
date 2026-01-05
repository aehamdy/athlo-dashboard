import type { ReactNode } from "react";

type ListProps = {
  children: ReactNode;
};

function List({ children }: ListProps) {
  return (
    <ul className="grid lg:grid-cols-2 gap-base h-full overflow-y-scroll">
      {children}
    </ul>
  );
}

export default List;
