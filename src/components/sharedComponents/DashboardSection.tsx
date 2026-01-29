import { useState } from "react";
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

interface DashboardSectionProps<T> {
  children: React.ReactNode;
  title: string;
  buttonLabel?: string;
  description: string;
  initialFormValue: T;
  formComponent: (props: {
    value: T;
    onChange: (value: T) => void;
  }) => React.ReactNode;
  onSubmit: (data: T) => void;
}

function DashboardSection<T>({
  children,
  title,
  buttonLabel,
  description,
  initialFormValue,
  formComponent,
  onSubmit,
}: DashboardSectionProps<T>) {
  const [formData, setFormData] = useState<T>(initialFormValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="flex flex-col gap-6 h-full p-compact lg:p-regular bg-light rounded-xl">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Add New {title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>

              {formComponent({
                value: formData,
                onChange: setFormData,
              })}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="active:text-light active:bg-accent-strong cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
                >
                  Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {children}
    </section>
  );
}

export default DashboardSection;
