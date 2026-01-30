import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";
import type { Category } from "@/types";

interface AddCategoryFormState {
  nameEn: string;
  nameAr: string;
}

interface AddCategoryFormProps {
  mode?: "add" | "edit";
  category?: Category;
  onSuccess?: () => void;
}

const initialValue: AddCategoryFormState = {
  nameEn: "",
  nameAr: "",
};

function AddCategoryForm({
  mode = "add",
  category,
  onSuccess,
}: AddCategoryFormProps) {
  const [formData, setFormData] = useState<AddCategoryFormState>(initialValue);
  const [submitting, setSubmitting] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && category) {
      setFormData({
        nameEn: category.nameEn,
        nameAr: category.nameAr,
      });
    }
  }, [mode, category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameEn && !formData.nameAr) return;

    setSubmitting(true);

    try {
      if (mode === "edit" && category) {
        await http.put(API_ENDPOINTS.categories.update, {
          ...formData,
          id: category.id,
        });
      } else {
        await http.post(API_ENDPOINTS.categories.create, formData);
        setFormData(initialValue);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Submit failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid gap-4">
        <Input
          name="nameEn"
          placeholder="Enter category name (English)"
          value={formData.nameEn}
          onChange={handleChange}
          required
          className="form-input"
        />

        <Input
          name="nameAr"
          placeholder="ادخل اسم التصنيف (العربية)"
          value={formData.nameAr}
          onChange={handleChange}
          required
          className="form-input"
        />

        <Button
          type="submit"
          className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
          disabled={submitting}
        >
          {mode === "edit" ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </form>
  );
}

export default AddCategoryForm;
