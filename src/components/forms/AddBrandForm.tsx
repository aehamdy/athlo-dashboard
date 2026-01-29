import { useState } from "react";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";

interface AddBrandFormState {
  nameEn: string;
  nameAr: string;
}

const initialValue: AddBrandFormState = {
  nameEn: "",
  nameAr: "",
};

function AddBrandForm() {
  const [brandFormData, setBrandFormData] =
    useState<AddBrandFormState>(initialValue);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandFormData({ ...brandFormData, [name]: value });
  };

  const addNewBrand = async (brandFormData: AddBrandFormState) => {
    try {
      await http.post(API_ENDPOINTS.brands.create, brandFormData);
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewBrand(brandFormData);
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

        <DialogClose asChild>
          <Button
            type="submit"
            className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
          >
            Add Brand
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

export default AddBrandForm;
