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
import { Link } from "react-router-dom";

interface DashboardSectionProps {
  children: React.ReactNode;
  title: string;
  buttonLabel?: string;
  navigateTo?: string;
  description: string;
  formComponent?: React.ReactNode;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
}

function DashboardSection({
  children,
  title,
  buttonLabel,
  navigateTo,
  description,
  formComponent,
  isDialogOpen,
  setIsDialogOpen,
}: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-4 md:gap-4 lg:gap-3 xl:gap-4 h-full p-compact md:p-regular lg:p-sm bg-light rounded-xl overflow-hidden">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {navigateTo ? (
              <Link
                to={navigateTo}
                className="flex items-center gap-tiny py-1.5 px-2 text-dark active:text-dark bg-accent-soft hover:bg-accent active:bg-accent rounded-md transform-colors duration-normal cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                {buttonLabel}
              </Link>
            ) : (
              buttonLabel && (
                <Button className="text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer">
                  <Plus />
                  {buttonLabel}
                </Button>
              )
            )}
          </DialogTrigger>

          {formComponent && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New {title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>

              {formComponent}
            </DialogContent>
          )}
        </Dialog>
      </div>

      {children}
    </section>
  );
}

export default DashboardSection;
