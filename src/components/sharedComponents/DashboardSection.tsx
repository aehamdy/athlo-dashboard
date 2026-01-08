import type React from "react";
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
  onButtonClick?: () => void;
  formComponent: React.ReactNode;
  description: string;
}

function DashboardSection({
  children,
  title,
  buttonLabel,
  formComponent,
  description,
}: // onButtonClick,
DashboardSectionProps) {
  return (
    <section
      className={`flex flex-col gap-6 h-full p-compact lg:p-regular bg-light rounded-xl`}
    >
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-dark bg-accent hover:bg-accent/80 active:bg-accent/60 cursor-pointer"
              >
                <Plus />
                {buttonLabel}
              </Button>
            </DialogTrigger>

            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-[425px]"
            >
              <DialogHeader>
                <DialogTitle>
                  {title.toLowerCase() === "brands"
                    ? "Add New Brand"
                    : title.toLowerCase() === "categories"
                    ? "Add New Category"
                    : ""}
                </DialogTitle>

                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>

              {formComponent}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="active:bg-accent/60 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="text-dark bg-accent hover:bg-accent/80 active:bg-accent/60 cursor-pointer"
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      {children}
    </section>
  );
}

export default DashboardSection;
