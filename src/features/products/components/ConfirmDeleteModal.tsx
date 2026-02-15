import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OctagonAlert } from "lucide-react";

type ConfirmDeleteModalProps<T> = {
  item: T | null;
  setItem: (item: T | null) => void;
  itemLabel: string;
  getDisplayName: (item: T) => string;
  onConfirm: (item: T) => void;
  onCancel: () => void;
};

function ConfirmDeleteModal<T>({
  item,
  setItem,
  itemLabel,
  getDisplayName,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps<T>) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && setItem(null)}>
      <DialogContent className="max-w-[390px] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            <div className="relative flex flex-col items-center gap-regular pt-6 pb-2">
              <div className="absolute top-0 start-1/2 -translate-y-full -translate-x-1/2 p-2 bg-light rounded-full">
                <div className="bg-red-500/10 rounded-full">
                  <OctagonAlert size={36} className="text-red-500" />
                </div>
              </div>
              You are about to delete a {itemLabel}
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="mb-2 text-center">
          Do you really want to delete{" "}
          <span className="font-semibold text-accent">
            {getDisplayName(item!)}
          </span>{" "}
          ?
        </DialogDescription>

        <div className="flex flex-col gap-md">
          <Button
            variant="plain"
            onClick={() => onConfirm(item!)}
            className="text-light active:text-dark bg-red-500 hover:bg-red-600 active:bg-red-600 hover:shadow-md transform duration-normal cursor-pointer"
          >
            Yes, Delete!
          </Button>

          <Button
            variant="outline"
            onClick={onCancel}
            className="active:bg-accent-strong hover:shadow-md transform duration-normal cursor-pointer"
          >
            No, Keep It.
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
