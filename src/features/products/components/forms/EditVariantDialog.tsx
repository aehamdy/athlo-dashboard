import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { ProductVariant } from '../../types';
import { Button } from '@/components/ui/button';
import Icon from '@/components/shared/Icon';
import useUpdateProductVariant from '../../hooks/useUpdateProductVariant';
import { useState } from 'react';
import Currency from '@/components/shared/Currency';

type EditVariantDialogProps = {
  variant: ProductVariant;
  productId: number;
};

function EditVariantDialog({ variant, productId }: EditVariantDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateMutation = useUpdateProductVariant(productId, () => {
    setIsDialogOpen(false);
  });

  const [form, setForm] = useState({
    attributeValueEn: variant.attributeValueEn || '',
    attributeValueAr: variant.attributeValueAr || '',
    unit: variant.unit || '',
    colorLabel: variant.colorLabel || '',
    colorHex: variant.colorHex || '#000000',
    price: variant.price,
    stockQuantity: variant.stockQuantity,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate({
      id: variant.id,
      ...form,
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="plain"
          size="icon"
          onClick={() => setIsDialogOpen(true)}
          className="group bg-gray-100"
        >
          <Icon
            name="Pencil"
            className="text-gray-500 group-hover:text-blue-500 transition-colors duration-normal"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 p-base">
        <DialogHeader>
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogDescription>{variant.sku}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
          <div className="flex justify-between">
            <div className="flex flex-col gap-tiny">
              <Label
                htmlFor="attributeValueEn"
                className="ms-xs text-xs text-neutral-muted"
              >
                Attr. Value (English)
              </Label>

              <Input
                id="attributeValueEn"
                value={form.attributeValueEn}
                onChange={(e) =>
                  handleChange('attributeValueEn', e.target.value)
                }
                placeholder="English Value"
                className="form-input"
              />
            </div>

            <div className="flex flex-col gap-tiny">
              <Label
                htmlFor="attributeValueAr"
                className="ms-xs text-xs text-neutral-muted"
              >
                Attr. Value (Arabic)
              </Label>

              <Input
                id="attributeValueAr"
                value={form.attributeValueAr}
                onChange={(e) =>
                  handleChange('attributeValueAr', e.target.value)
                }
                placeholder="Arabic Value"
                className="form-input"
              />
            </div>
          </div>

          <div className="flex flex-col gap-tiny">
            <Label htmlFor="unit" className="ms-xs text-xs text-neutral-muted">
              Unit
            </Label>

            <Input
              id="unit"
              value={form.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              className="form-input"
            />
          </div>

          {/* 🎨 COLOR */}
          <div className="flex justify-between items-center gap-xs">
            <div className="flex flex-col gap-tiny">
              <Label
                htmlFor="colorLabel"
                className="ms-xs text-xs text-neutral-muted"
              >
                Color Label
              </Label>

              <Input
                id="colorLabel"
                value={form.colorLabel}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="flex flex-col gap-tiny">
              <Label
                htmlFor="colorHex"
                className="ms-xs text-xs text-neutral-muted"
              >
                Color Code
              </Label>

              <div className="flex gap-2 items-center">
                <Input
                  type="color"
                  value={form.colorHex}
                  onChange={(e) => handleChange('colorHex', e.target.value)}
                  className="form-input"
                />

                <Input
                  value={form.colorHex}
                  onChange={(e) => handleChange('colorHex', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-tiny">
            <Label htmlFor="unit" className="ms-xs text-xs text-neutral-muted">
              Price (<Currency />)
            </Label>

            <Input
              type="number"
              value={form.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              placeholder="Price"
              className="form-input"
            />
          </div>

          <div className="flex flex-col gap-tiny">
            <Label htmlFor="unit" className="ms-xs text-xs text-neutral-muted">
              Quantity
            </Label>

            <Input
              type="number"
              value={form.stockQuantity}
              onChange={(e) =>
                handleChange('stockQuantity', Number(e.target.value))
              }
              placeholder="Stock"
              className="form-input"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={updateMutation.isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditVariantDialog;
