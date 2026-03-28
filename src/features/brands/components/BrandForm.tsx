import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import type { Brand, BrandFormValues } from '../types';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { brandSchema } from '../brand.schema';

type Props = {
  brand: Brand | null;
  createBrand: UseMutationResult<Brand, Error, FormData>;
  updateBrand: UseMutationResult<Brand, Error, FormData>;
  onSuccess: () => void;
};

function BrandForm({ brand, createBrand, updateBrand, onSuccess }: Props) {
  const isEditMode = !!brand;

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema(isEditMode)),
    mode: 'onChange',
    defaultValues: {
      nameEn: brand?.nameEn ?? '',
      nameAr: brand?.nameAr ?? '',
      image: null,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit = async (values: BrandFormValues) => {
    try {
      const formData = new FormData();
      formData.append('nameEn', values.nameEn);
      formData.append('nameAr', values.nameAr);

      if (values.image) formData.append('image', values.image);

      if (isEditMode) {
        formData.append('id', String(brand!.id));
        await updateBrand.mutateAsync(formData);
        toast.success(`Brand "${values.nameEn}" updated successfully`);
      } else {
        await createBrand.mutateAsync(formData);
        toast.success(`Brand "${values.nameEn}" added successfully`);
      }

      onSuccess();
      reset({ nameEn: '', nameAr: '', image: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-compact">
        <Controller
          name="nameEn"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter brand's English name"
              disabled={isSubmitting}
              className="form-input w-full"
            />
          )}
        />

        <Controller
          name="nameAr"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="ادخل اسم العلامة التجارية بالعربية"
              disabled={isSubmitting}
              className="form-input w-full"
            />
          )}
        />

        {isEditMode && brand?.imageUrl && (
          <img
            key={brand.id}
            src={brand.imageUrl}
            alt={brand.nameEn}
            className="w-24 h-24 object-cover rounded-md"
          />
        )}

        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Input
              type="file"
              name={field.name}
              required={!isEditMode}
              disabled={isSubmitting}
              onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
              ref={field.ref}
              className="form-input w-full"
            />
          )}
        />
      </div>

      <div className="w-full">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="main-button w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-sm">
              <Loading size="sm" />
              {isEditMode ? ' Updating...' : ' Adding...'}
            </div>
          ) : isEditMode ? (
            'Update Brand'
          ) : (
            'Add Brand'
          )}
        </Button>
      </div>

      <DialogClose asChild>
        <Button variant="outline" disabled={isSubmitting} className="w-full">
          Cancel
        </Button>
      </DialogClose>
    </form>
  );
}

export default BrandForm;
