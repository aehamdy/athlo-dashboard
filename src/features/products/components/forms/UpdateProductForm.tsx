import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Product } from "@/types";
import { Label } from "../../../../components/ui/label";
import FormSelect from "@/components/shared/FormSelect";
import { useForm } from "react-hook-form";
import {
  productInfoSchema,
  type ProductInfoFormType,
} from "../../products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useBrands from "@/features/brands/api/useBrands";
import { useCategories } from "@/features/categories/hooks/useCategories";

type UpdateProductFormProps = {
  product: Product | null;
  onSuccess: () => void;
};

type UpdateProductFormState = {
  code: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  basePrice: string;
  season: string;
  clubEn: string;
  clubAr: string;
  brandId: string;
  categoryId: string;
};

const initialValue: UpdateProductFormState = {
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

function UpdateProductForm({ product, onSuccess }: UpdateProductFormProps) {
  const {
    formState: { errors },
  } = useForm<ProductInfoFormType>({
    resolver: zodResolver(productInfoSchema),
    mode: "onChange",
  });
  const [productFormData, setProductFormData] =
    useState<UpdateProductFormState>(() => {
      if (!product) return initialValue;

      return {
        code: product.code ?? "",
        nameEn: product.name ?? "",
        nameAr: "",
        descriptionEn: product.description ?? "",
        descriptionAr: "",
        basePrice: String(product.basePrice ?? ""),
        season: product.season ?? "",
        clubEn: product.club ?? "",
        clubAr: "",
        brandId: String(product.brandId ?? ""),
        categoryId: String(product.categoryId ?? ""),
      };
    });
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: brands = [], isLoading: brandsLoading } = useBrands();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    if (!product) return;

    const basePrice = Number(productFormData.basePrice);
    const brandId = Number(productFormData.brandId);
    const categoryId = Number(productFormData.categoryId);

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
      id: product.id, // Add ID
      code: productFormData.code.trim(),
      nameEn: productFormData.nameEn.trim(),
      nameAr: productFormData.nameAr.trim(),
      descriptionEn: productFormData.descriptionEn.trim(),
      descriptionAr: productFormData.descriptionAr.trim(),
      basePrice,
      season: productFormData.season.trim(),
      clubEn: productFormData.clubEn || null,
      clubAr: productFormData.clubAr || null,
      brandId,
      categoryId,
    };

    await http.put(API_ENDPOINTS.products.update, payload);

    onSuccess();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleUpdateProduct();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Label className="form-label">Product Name (English)</Label>
          <Input
            required
            name="nameEn"
            value={productFormData.nameEn}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
        <div className="relative">
          <Label className="form-label">Product Name (Arabic)</Label>
          <Input
            required
            name="nameAr"
            value={productFormData.nameAr}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>

        <div className="relative">
          <Label className="form-label">Description (English)</Label>
          <Input
            required
            name="descriptionEn"
            value={productFormData.descriptionEn}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
        <div className="relative">
          <Label className="form-label">Description (Arabic)</Label>
          <Input
            required
            name="descriptionAr"
            value={productFormData.descriptionAr}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>

        <div className="relative">
          <Label className="form-label">Club (English)</Label>
          <Input
            name="clubEn"
            value={productFormData.clubEn}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
        <div className="relative">
          <Label className="form-label">Club (Arabic)</Label>
          <Input
            name="clubAr"
            value={productFormData.clubAr}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>

        <div className="relative">
          <Label className="form-label">Product Code</Label>
          <Input
            required
            name="code"
            value={productFormData.code}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
        <div className="relative">
          <Label className="form-label">Season</Label>
          <Input
            required
            name="season"
            value={productFormData.season}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>

        <FormSelect
          placeholder="Select Brand"
          value={productFormData.brandId}
          onValueChange={(val) =>
            setProductFormData((prev) => ({ ...prev, brandId: val }))
          }
          options={brands}
          error={errors.brandId?.message}
          disabled={brandsLoading}
        />

        <FormSelect
          placeholder="Select Category"
          value={productFormData.categoryId}
          onValueChange={(val) =>
            setProductFormData((prev) => ({ ...prev, categoryId: val }))
          }
          options={categories}
          error={errors.categoryId?.message}
          disabled={categoriesLoading}
        />

        <div className="relative">
          <Label className="form-label">Price</Label>
          <Input
            required
            name="basePrice"
            value={productFormData.basePrice}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-tiny px-xs text-dark active:text-light bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
      >
        Update Product
      </Button>
    </form>
  );
}

export default UpdateProductForm;
