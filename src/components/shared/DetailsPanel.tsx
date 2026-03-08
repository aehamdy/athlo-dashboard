import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

type DetailsPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  width?: string;
  children?: React.ReactNode;
};

function DetailsPanel({
  open,
  onOpenChange,
  title,
  description,
  width,
  children,
}: DetailsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`${width || "min-w-[95%] md:min-w-3/4 lg:min-w-1/2"} flex flex-col gap-0 overflow-y-auto`}
      >
        <SheetHeader className="gap-tiny p-regular border-b">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default DetailsPanel;
