import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";
import { useActionState } from "react";
import { toast } from "sonner";
import type { Category } from "../types";
import Loading from "@/components/shared/Loading";

type Props = {
  category: Category | null;
  createCategory: UseMutationResult<Category, Error, FormData>;
  updateCategory: UseMutationResult<Category, Error, FormData>;
  onSuccess: () => void;
};

function SubmitButton({ isEditMode }: { isEditMode: boolean }) {
  const { pending } = useFormStatus();

  const defaultLabel = isEditMode ? "Update Category" : "Add Category";

  return (
    <Button type="submit" disabled={pending} className="main-button w-full">
      {pending ? (
        <div className="flex items-center gap-sm">
          <Loading size="sm" />
          {isEditMode ? " Updating..." : " Adding..."}
        </div>
      ) : (
        defaultLabel
      )}
    </Button>
  );
}

function CancelButton() {
  const { pending } = useFormStatus();

  return (
    <DialogClose asChild>
      <Button variant="outline" disabled={pending} className="w-full">
        Cancel
      </Button>
    </DialogClose>
  );
}

function CategoryForm({
  category,
  createCategory,
  updateCategory,
  onSuccess,
}: Props) {
  const isEditMode = !!category;

  const action = async (_: unknown, formData: FormData) => {
    try {
      const nameEn = formData.get("nameEn")?.toString();
      const nameAr = formData.get("nameAr")?.toString();
      if (!nameEn || !nameAr) throw new Error("Missing required field");

      if (!isEditMode) {
        const image = formData.get("image") as File | null;
        if (!image || image.size === 0) throw new Error("Image is required");
      }

      if (isEditMode) {
        const image = formData.get("image") as File | null;

        if (!image || image.size === 0) {
          formData.delete("image");
        }

        formData.append("id", String(category!.id));

        await updateCategory.mutateAsync(formData);

        toast.success(`Category "${nameEn}" updated successfully`, {
          closeButton: true,
        });
      } else {
        await createCategory.mutateAsync(formData);

        toast.success(`Category "${nameEn}" added successfully!`, {
          closeButton: true,
        });
      }

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    }

    return null;
  };

  const [, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-compact">
      <div className="flex flex-col gap-compact">
        <div className="">
          <Input
            name="nameEn"
            required
            defaultValue={category?.nameEn ?? ""}
            placeholder="Enter category's English name"
            className="form-input w-full"
          />
        </div>

        <div className="">
          <Input
            name="nameAr"
            required
            defaultValue={category?.nameAr ?? ""}
            placeholder="ادخل اسم الفئة بالعربية"
            className="form-input w-full"
          />
        </div>

        {isEditMode && category?.imageUrl && (
          <img
            key={category.id}
            src={category.imageUrl}
            alt={category.nameEn}
            className="w-24 h-24 object-cover rounded-md"
          />
        )}

        <Input
          type="file"
          name="image"
          required={!isEditMode}
          className="form-input w-full"
        />
      </div>

      <div className="w-full">
        <SubmitButton isEditMode={isEditMode} />
      </div>

      <CancelButton />
    </form>
  );
}

export default CategoryForm;
