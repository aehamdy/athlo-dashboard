import type { ReactNode } from 'react';

type AppGridProps = {
  children: ReactNode;
};

export default function AppGrid({ children }: AppGridProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-base h-full overflow-y-auto scrollbar-thin">
      {children}
    </section>
  );
}
