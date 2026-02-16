import { useActionState, useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";
import type { Brand } from "@/types";
import { DialogClose } from "../../../components/ui/dialog";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface BrandFormProps {
  mode?: "add" | "edit";
  brand?: Brand;
  onSuccess?: () => void;
}

type ActionState = {
  error: string | null;
};

const initialState: ActionState = {
  error: null,
};

function BrandForm({ mode = "add", brand, onSuccess }: BrandFormProps) {
  const [image, setImage] = useState<File | null>(null);

  const submitAction = async (
    _: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    try {
      if (image) {
        formData.append("image", image);
      }

      if (mode === "edit" && brand) {
        formData.append("id", String(brand.id));
        await http.put(API_ENDPOINTS.brands.update, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await http.post(API_ENDPOINTS.brands.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess?.();
      setImage(null);

      return { error: null };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;

      const message =
        axiosError.response?.data?.message ||
        "Something went wrong while adding.";

      toast.error(message, {
        closeButton: true,
      });

      return { error: message };
    }
  };

  const [state, action, isPending] = useActionState(submitAction, initialState);

  // Prefill form when editing
  useEffect(() => {
    if (mode === "edit" && brand) {
      const form = document.getElementById(
        "brand-form",
      ) as HTMLFormElement | null;

      if (!form) return;

      (form.elements.namedItem("nameEn") as HTMLInputElement).value =
        brand.nameEn ?? "";
      (form.elements.namedItem("nameAr") as HTMLInputElement).value =
        brand.nameAr ?? "";
    }
  }, [mode, brand]);

  return (
    <form action={action} id="brand-form" className="w-full space-y-4">
      <div className="grid gap-4">
        <Input
          name="nameEn"
          placeholder="Enter brand name (English)"
          required
          className="form-input"
        />

        <Input
          name="nameAr"
          placeholder="ادخل اسم الماركة (العربية)"
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
            alt="Brand preview"
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
              ? "Update Brand"
              : "Add Brand"}
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

export default BrandForm;
