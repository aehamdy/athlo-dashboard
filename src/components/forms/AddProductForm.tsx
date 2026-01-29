import { useState } from "react";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";

interface AddProductFormState {
  nameEn: string;
  nameAr: string;
}

const initialValue: AddProductFormState = {
  nameEn: "",
  nameAr: "",
};

function AddProductForm() {
  const [productFormData, setProductFormData] =
    useState<AddProductFormState>(initialValue);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  const addNewCategory = async (categoryFormData: AddProductFormState) => {
    try {
      await http.post(API_ENDPOINTS.categories.create, {
        nameEn: categoryFormData.nameEn,
        nameAr: categoryFormData.nameAr,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productFormData.nameEn && !productFormData.nameAr) {
      console.warn("Both category names are empty");
      return;
    }

    try {
      await addNewCategory(productFormData);
      // Reset form after successful submission
      setProductFormData(initialValue);
    } catch (error) {
      console.error("Failed to create category:", error);
      // Don't reset form on error so user can retry
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid gap-4">
        <Input
          type="text"
          required
          name="nameEn"
          placeholder="Enter product name (English)"
          value={productFormData.nameEn}
          onChange={handleFormChange}
          className="form-input"
        />

        <Input
          type="text"
          required
          name="nameAr"
          placeholder="ادخل اسم المنتج (العربية)"
          value={productFormData.nameAr}
          onChange={handleFormChange}
          className="form-input"
        />

        <DialogClose asChild>
          <Button
            type="submit"
            className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
          >
            Add Product
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

export default AddProductForm;
