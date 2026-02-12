import { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { DialogClose } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { API_ENDPOINTS } from "@/api/endPoints";
import http from "@/api/http";

type AddProductFormState = {
  code: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  basePrice: string;
  season: string;
  clubEn?: string;
  clubAr?: string;
  brandId: string;
  categoryId: string;
};

const initialValue: AddProductFormState = {
  code: "",
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  basePrice: "",
  season: "",
  clubEn: "",
  clubAr: "",
  brandId: "",
  categoryId: "",
};

interface ApiError {
  response?: {
    data?: unknown;
  };
  message?: string;
}

function AddProductForm() {
  const [productFormData, setProductFormData] =
    useState<AddProductFormState>(initialValue);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitProduct = async (data: AddProductFormState) => {
    // required numeric fields
    if (!data.basePrice || !data.brandId || !data.categoryId) {
      throw new Error("Please fill all numeric fields");
    }

    const basePrice = Number(data.basePrice);
    const brandId = Number(data.brandId);
    const categoryId = Number(data.categoryId);

    if (
      Number.isNaN(basePrice) ||
      Number.isNaN(brandId) ||
      Number.isNaN(categoryId) ||
      basePrice <= 0 ||
      brandId <= 0 ||
      categoryId <= 0
    ) {
      throw new Error("Numeric fields must be valid numbers greater than 0");
    }

    const payload = {
      code: data.code.trim(),
      nameEn: data.nameEn.trim(),
      nameAr: data.nameAr.trim(),
      descriptionEn: data.descriptionEn.trim(),
      descriptionAr: data.descriptionAr.trim(),
      season: data.season.trim(),
      clubEn: data.clubEn?.trim() || null,
      clubAr: data.clubAr?.trim() || null,
      basePrice,
      brandId,
      categoryId,
    };

    await http.post(API_ENDPOINTS.products.create, payload);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitProduct(productFormData);

      setProductFormData(initialValue);
    } catch (error: ApiError | unknown) {
      const apiError = error as ApiError;

      console.error(
        "Backend error:",
        apiError.response?.data || apiError.message,
      );
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="nameEn"
          placeholder="Product name (English)"
          value={productFormData.nameEn}
          onChange={handleFormChange}
          className="form-input"
          required
        />
        <Input
          name="nameAr"
          placeholder="اسم المنتج (العربية)"
          value={productFormData.nameAr}
          onChange={handleFormChange}
          className="form-input"
          required
        />

        <Input
          name="descriptionEn"
          placeholder="Description (English)"
          value={productFormData.descriptionEn}
          onChange={handleFormChange}
          className="form-input"
          required
        />
        <Input
          name="descriptionAr"
          placeholder="وصف المنتج (العربية)"
          value={productFormData.descriptionAr}
          onChange={handleFormChange}
          className="form-input"
          required
        />

        <Input
          name="clubEn"
          placeholder="Club (English)"
          value={productFormData.clubEn}
          onChange={handleFormChange}
          className="form-input"
        />
        <Input
          name="clubAr"
          placeholder="النادي (العربية)"
          value={productFormData.clubAr}
          onChange={handleFormChange}
          className="form-input"
        />

        <Input
          name="season"
          placeholder="Season"
          value={productFormData.season}
          onChange={handleFormChange}
          className="form-input"
          required
        />

        {/* Numeric inputs */}
        <Input
          name="code"
          placeholder="Product Code"
          value={productFormData.code}
          onChange={handleFormChange}
          className="form-input"
          required
        />

        <Input
          type="number"
          name="categoryId"
          placeholder="Category ID"
          value={productFormData.categoryId}
          onChange={handleFormChange}
          className="form-input"
          required
        />

        <Input
          type="number"
          name="brandId"
          placeholder="Brand ID"
          value={productFormData.brandId}
          onChange={handleFormChange}
          className="form-input"
          required
        />

        <Input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={productFormData.basePrice}
          onChange={handleFormChange}
          className="form-input"
          required
        />
      </div>

      <DialogClose asChild>
        <Button
          type="submit"
          className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
        >
          Add Product
        </Button>
      </DialogClose>
    </form>
  );
}

export default AddProductForm;
