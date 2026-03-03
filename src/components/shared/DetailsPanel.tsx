import { Sheet, SheetContent } from "../ui/sheet";

type DetailsPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
};

function DetailsPanel({ open, onOpenChange, children }: DetailsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="min-w-[95%] md:min-w-3/4 lg:min-w-1/2 flex flex-col gap-0 overflow-y-auto"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default DetailsPanel;
