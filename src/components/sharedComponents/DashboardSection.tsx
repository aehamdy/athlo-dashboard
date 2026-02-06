import Heading from "./Heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DashboardSectionProps {
  children: React.ReactNode;
  title: string;
  buttonLabel?: string;
  description: string;
  formComponent?: React.ReactNode;
}

function DashboardSection({
  children,
  title,
  buttonLabel,
  description,
  formComponent,
}: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-4 md:gap-4 lg:gap-3 xl:gap-4 h-full p-compact md:p-regular lg:p-sm bg-light rounded-xl overflow-hidden">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        <Dialog>
          {buttonLabel && (
            <DialogTrigger asChild>
              <Button className="text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer">
                <Plus />
                {buttonLabel}
              </Button>
            </DialogTrigger>
          )}

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New {title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {formComponent}
          </DialogContent>
        </Dialog>
      </div>

      {children}
    </section>
  );
}

export default DashboardSection;
