import { useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";
import type { Category } from "@/types";
import { DialogClose } from "../ui/dialog";

interface CategoryFormProps {
  mode?: "add" | "edit";
  category?: Category;
  onSuccess?: () => void;
}

type ActionState = {
  error: string | null;
};

const initialState: ActionState = {
  error: null,
};

function CategoryForm({
  mode = "add",
  category,
  onSuccess,
}: CategoryFormProps) {
  const [image, setImage] = useState<File | null>(null);

  const submitAction = async (
    _: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    try {
      if (image) {
        formData.append("image", image);
      }

      if (mode === "edit" && category) {
        formData.append("id", String(category.id));

        await http.put(API_ENDPOINTS.categories.update, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await http.post(API_ENDPOINTS.categories.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess?.();
      setImage(null);

      return { error: null };
    } catch (err) {
      console.error("Submit failed:", err);
      return { error: "Something went wrong. Please try again." };
    }
  };

  const [state, action, isPending] = useActionState(submitAction, initialState);

  // Prefill form when editing
  useEffect(() => {
    if (mode === "edit" && category) {
      const form = document.getElementById(
        "category-form",
      ) as HTMLFormElement | null;

      if (!form) return;

      (form.elements.namedItem("nameEn") as HTMLInputElement).value =
        category.nameEn;
      (form.elements.namedItem("nameAr") as HTMLInputElement).value =
        category.nameAr;
    }
  }, [mode, category]);

  return (
    <form action={action} id="category-form" className="w-full space-y-4">
      <div className="grid gap-4">
        <Input
          name="nameEn"
          placeholder="Enter category name (English)"
          required
          className="form-input"
        />

        <Input
          name="nameAr"
          placeholder="ادخل اسم التصنيف (العربية)"
          required
          className="form-input"
        />

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          className="form-input"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Category preview"
            className="h-24 w-24 rounded-sm object-cover"
          />
        )}

        {state.error && <p className="text-sm text-red-500">{state.error}</p>}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
        >
          {isPending
            ? "Saving..."
            : mode === "edit"
              ? "Update Category"
              : "Add Category"}
        </Button>

        <DialogClose asChild>
          <Button
            variant="outline"
            className="w-full -mt-tiny active:text-light active:bg-accent-strong cursor-pointer"
          >
            Cancel
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

export default CategoryForm;
