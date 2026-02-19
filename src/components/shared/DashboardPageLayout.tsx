import type { ReactNode } from "react";
import Heading from "./Heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DashboardPageLayoutProps = {
  title: string;
  dialogLabel: string;
  description: string;
  action?: ReactNode;
  filters?: ReactNode;
  formComponent?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function DashboardPageLayout({
  title,
  dialogLabel,
  description,
  action,
  filters,
  formComponent,
  children,
  open,
  onOpenChange,
}: DashboardPageLayoutProps) {
  return (
    <section className="flex flex-col gap-base h-full p-compact md:p-regular lg:p-sm bg-light rounded-xl">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>{action && action}</DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{dialogLabel}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {formComponent}
          </DialogContent>
        </Dialog>
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
