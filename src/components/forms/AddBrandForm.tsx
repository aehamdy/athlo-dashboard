import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";
import type { Brand } from "@/types";

interface AddBrandFormProps {
  mode?: "add" | "edit";
  brand?: Brand;
  onSuccess?: () => void;
}

interface AddBrandFormState {
  nameEn: string;
  nameAr: string;
}

const initialValue: AddBrandFormState = {
  nameEn: "",
  nameAr: "",
};

function AddBrandForm({ mode = "add", brand, onSuccess }: AddBrandFormProps) {
  const [brandFormData, setBrandFormData] =
    useState<AddBrandFormState>(initialValue);
  const [submitting, setSubmitting] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && brand) {
      setBrandFormData({
        nameEn: brand.nameEn || "",
        nameAr: brand.nameAr || "",
      });
    }
  }, [mode, brand]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addNewBrand = async (brandFormData: AddBrandFormState) => {
    try {
      await http.post(API_ENDPOINTS.brands.create, brandFormData);
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  };

  const updateBrand = async (brandFormData: AddBrandFormState) => {
    if (!brand) return;
    try {
      const updateData = {
        ...brandFormData,
        id: brand.id,
      };
      await http.put(API_ENDPOINTS.brands.update, updateData);
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (mode === "edit") {
        await updateBrand(brandFormData);
      } else {
        await addNewBrand(brandFormData);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid gap-4">
        <Input
          type="text"
          required
          name="nameEn"
          placeholder="Enter brand name (English)"
          value={brandFormData.nameEn}
          onChange={handleFormChange}
          className="form-input"
        />

        <Input
          type="text"
          required
          name="nameAr"
          placeholder="ادخل اسم الماركة (العربية)"
          value={brandFormData.nameAr}
          onChange={handleFormChange}
          className="form-input"
        />

        <Button
          type="submit"
          className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
          disabled={submitting}
        >
          {submitting
            ? "Updating..."
            : mode === "edit"
              ? "Update Brand"
              : "Add Brand"}
        </Button>
      </div>
    </form>
  );
}

export default AddBrandForm;
