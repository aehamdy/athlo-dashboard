import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import type { Brand } from "../types";
import type { UseMutationResult } from "@tanstack/react-query";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useActionState } from "react";

type Props = {
  brand: Brand | null;
  createBrand: UseMutationResult<Brand, Error, FormData>;
  updateBrand: UseMutationResult<Brand, Error, FormData>;
  onSuccess: () => void;
};

function SubmitButton({ isEditMode }: { isEditMode: boolean }) {
  const { pending } = useFormStatus();

  const defaultLabel = isEditMode ? "Update Brand" : "Add Brand";

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

function BrandForm({ brand, createBrand, updateBrand, onSuccess }: Props) {
  const isEditMode = !!brand;

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
          formData.delete("iamge");
        }

        formData.append("id", String(brand!.id));

        await updateBrand.mutateAsync(formData);

        toast.success(`Brand "${nameEn}" updated successfully`);
      } else {
        await createBrand.mutateAsync(formData);

        toast.success(`Brand "${nameEn}" added successfully`);
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
            defaultValue={brand?.nameEn ?? ""}
            placeholder="Enter brand's English name"
            className="form-input w-full"
          />
        </div>

        <div className="">
          <Input
            name="nameAr"
            required
            defaultValue={brand?.nameAr ?? ""}
            placeholder="ادخل اسم الفئة بالعربية"
            className="form-input w-full"
          />
        </div>

        {isEditMode && brand?.imageUrl && (
          <img
            key={brand.id}
            src={brand.imageUrl}
            alt={brand.nameEn}
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

export default BrandForm;
