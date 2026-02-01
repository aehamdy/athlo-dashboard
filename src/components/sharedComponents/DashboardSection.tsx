import Heading from "./Heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DashboardSectionProps {
  children: React.ReactNode;
  title: string;
  buttonLabel?: string;
  description: string;
  formComponent: React.ReactNode;
}

function DashboardSection({
  children,
  title,
  buttonLabel,
  description,
  formComponent,
}: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-2 lg:gap-4 h-full p-compact lg:p-regular bg-light rounded-xl overflow-hidden">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer">
              <Plus />
              {buttonLabel}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New {title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {formComponent}

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full -mt-tiny active:text-light active:bg-accent-strong cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {children}
    </section>
  );
}

export default DashboardSection;
