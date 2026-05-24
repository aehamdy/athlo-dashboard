import Icon from '@/components/shared/Icon';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ConfirmDeleteModalProps<T> = {
  item: T | null;
  setItem: (item: T | null) => void;
  itemLabel: string;
  getDisplayName: (item: T) => string;
  onConfirm: () => void;
  onCancel?: () => void;
  isPending?: boolean;
};

function ConfirmDeleteModal<T>({
  item,
  setItem,
  itemLabel,
  getDisplayName,
  onConfirm,
  onCancel,
  isPending = false,
}: ConfirmDeleteModalProps<T>) {
  const isOpen = !!item;

  const handleClose = () => {
    setItem(null);
    onCancel?.();
  };

  if (!isOpen || !item) return null;

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && setItem(null)}>
      <DialogContent className="max-w-97.5 sm:max-w-100">
        <DialogHeader>
          <DialogTitle>
            <div className="relative flex flex-col items-center gap-regular pt-6 pb-2">
              <div className="absolute top-0 start-1/2 -translate-y-full -translate-x-1/2 p-2 bg-light rounded-full">
                <div className="bg-red-500/10 rounded-full">
                  <Icon
                    name="OctagonAlert"
                    size={36}
                    className="text-red-500"
                  />
                </div>
              </div>
              You are about to delete a {itemLabel}
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="mb-2 text-center">
          Do you really want to delete{' '}
          <span className="font-semibold text-accent">
            {item ? getDisplayName(item) : ''}
          </span>{' '}
          ?
        </DialogDescription>

        <div className="flex flex-col gap-sm">
          <Button
            variant="destructive"
            onClick={() => item && onConfirm()}
            disabled={!item || isPending}
            className="text-light active:text-dark bg-red-500 hover:bg-red-600 active:bg-red-600 hover:shadow-md transform duration-normal cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-sm">
                <Loading size="sm" />
                Deleting...
              </div>
            ) : (
              'Yes, Delete!'
            )}
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
            onClick={handleClose}
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
