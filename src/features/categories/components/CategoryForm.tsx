import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Category, CategoryFormValues } from '../types';
import Loading from '@/components/shared/Loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../category.schema';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  category: Category | null;
  createCategory: UseMutationResult<Category, Error, FormData>;
  updateCategory: UseMutationResult<Category, Error, FormData>;
  onSuccess: () => void;
};

function CategoryForm({
  category,
  createCategory,
  updateCategory,
  onSuccess,
}: Props) {
  const isEditMode = !!category;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema(isEditMode)),
    mode: 'onChange',
    defaultValues: {
      nameEn: category?.nameEn ?? '',
      nameAr: category?.nameAr ?? '',
      image: null,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const formData = new FormData();
      formData.append('nameEn', values.nameEn);
      formData.append('nameAr', values.nameAr);

      if (values.image) formData.append('image', values.image);

      if (isEditMode) {
        formData.append('id', String(category!.id));
        await updateCategory.mutateAsync(formData);
        toast.success(`Category "${values.nameEn}" updated successfully`);
      } else {
        await createCategory.mutateAsync(formData);
        toast.success(`Category "${values.nameEn}" added successfully`);
      }

      onSuccess();
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
              placeholder="Enter category's English name"
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
              placeholder="ادخل اسم الفئة بالعربية"
              disabled={isSubmitting}
              className="form-input w-full"
            />
          )}
        />

        {isEditMode && category?.imageUrl && (
          <img
            key={category.id}
            src={category.imageUrl}
            alt={category.nameEn}
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
            'Update Category'
          ) : (
            'Add Category'
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

export default CategoryForm;
