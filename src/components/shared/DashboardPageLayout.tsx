import type { ReactNode } from "react";
import Heading from "./Heading";

type DashboardPageLayoutProps = {
  title: string;
  action?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
};

function DashboardPageLayout({
  title,
  action,
  filters,
  children,
}: DashboardPageLayoutProps) {
  return (
    <section className="flex flex-col gap-base h-full p-compact md:p-regular lg:p-sm bg-light rounded-xl">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        {action && <div>{action}</div>}
      </div>

      {/* Filters Row */}
      {filters && (
        <div className="flex justify-between items-center gap-base">
          {filters}
        </div>
      )}

      {/* Main Content */}
      <div>{children}</div>
    </section>
  );
}

export default DashboardPageLayout;
