import { useState } from "react";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";

interface AddCategoryFormState {
  nameEn: string;
  nameAr: string;
}

const initialValue: AddCategoryFormState = {
  nameEn: "",
  nameAr: "",
};

function AddCategoryForm() {
  const [categoryFormData, setCategoryFormData] =
    useState<AddCategoryFormState>(initialValue);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const addNewCategory = async (categoryFormData: AddCategoryFormState) => {
    try {
      await http.post(API_ENDPOINTS.categories.create, categoryFormData);
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryFormData.nameEn && !categoryFormData.nameAr) {
      console.warn("Both brand names are empty");
      return;
    }

    try {
      await addNewCategory(categoryFormData);
      // Reset form after successful submission
      setCategoryFormData(initialValue);
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
          placeholder="Enter category name (English)"
          value={categoryFormData.nameEn}
          onChange={handleFormChange}
          className="form-input"
        />

        <Input
          type="text"
          required
          name="nameAr"
          placeholder="ادخل اسم التصنيف (العربية)"
          value={categoryFormData.nameAr}
          onChange={handleFormChange}
          className="form-input"
        />

        <DialogClose asChild>
          <Button
            type="submit"
            className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
          >
            Add Category
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

export default AddCategoryForm;
