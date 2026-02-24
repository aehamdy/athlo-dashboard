import Icon from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import type { ProductVariantsFormType } from "../../schemas";
import { Label } from "@/components/ui/label";

interface VariantRowProps {
  index: number;
  remove: (index: number) => void;
  totalRows: number;
  basePrice: number;
}

const sizes = [
  { id: 1, value: "xs", label: "XS" },
  { id: 2, value: "s", label: "S" },
  { id: 3, value: "m", label: "M" },
  { id: 4, value: "l", label: "L" },
  { id: 5, value: "xl", label: "XL" },
  { id: 6, value: "2xl", label: "2XL" },
  { id: 7, value: "3xl", label: "3XL" },
];

function VariantRow({ index, remove, totalRows, basePrice }: VariantRowProps) {
  const { register, control, setValue } =
    useFormContext<ProductVariantsFormType>();

  // Set initial price when component mounts or basePrice changes
  useEffect(() => {
    if (basePrice > 0) {
      setValue(`variants.${index}.price`, basePrice);
    }
  }, [basePrice, index, setValue]);

  return (
    <div className="grid grid-cols-6 gap-2 md:grid-cols-12 md:gap-4 items-center mb-xs py-base bg-gray-50 px-xs border-b border-gray-200">
      <div className="col-span-6 flex justify-between items-center md:hidden">
        <h4 className="text-sm font-medium">Variant {index + 1}</h4>

        {totalRows > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
            className="group bg-transparent"
          >
            <Icon
              name="Trash2"
              className="text-gray-400 group-hover:text-red-500 duration-normal"
            />
          </Button>
        )}
      </div>

      <div className="col-span-3 md:col-span-2">
        <Controller
          control={control}
          name={`variants.${index}.size`}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full form-input">
                <SelectValue placeholder="Size" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {sizes.map((size) => (
                    <SelectItem key={size.id} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="col-span-3 md:col-span-3">
        <Input
          {...register(`variants.${index}.color`)}
          placeholder="Color Name"
          className="form-input"
        />
      </div>

      <div className="col-span-6 md:col-span-2">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">
          Color Code
        </Label>

        <div className="flex items-center gap-4 px-compact bg-gray-100 rounded-md">
          <Controller
            control={control}
            name={`variants.${index}.colorCode`}
            render={({ field }) => (
              <div className="flex justify-between items-center gap-[30px]">
                <div className="relative">
                  <div
                    className="w-8 h-6 border border-gray-400 rounded-xl shadow-sm"
                    style={{ backgroundColor: field.value || "#000000" }}
                  />
                  <input
                    type="color"
                    value={field.value || "#000000"}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <Input
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#000000"
                  className="color-code-input p-0 border-0 outline-0 ring-0 focus-visible:ring-0 shadow-none"
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="col-span-3 md:col-span-2">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">Price</Label>

        <Controller
          control={control}
          name={`variants.${index}.price`}
          render={({ field }) => (
            <Input
              type="number"
              {...field}
              value={field.value || basePrice}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? 0 : Number(value));
              }}
              placeholder="Price"
              className="form-input"
            />
          )}
        />
      </div>

      <div className="col-span-3 md:col-span-2">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">Quantity</Label>

        <Input
          type="number"
          {...register(`variants.${index}.stock`, {
            valueAsNumber: true,
          })}
          placeholder="Stock"
          className="form-input"
        />
      </div>

      <div className="hidden md:col-span-1 md:flex md:justify-center">
        {totalRows > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
            className="group bg-transparent hover:bg-transparent"
          >
            <Icon
              name="Trash2"
              className="text-gray-400 group-hover:text-red-500 duration-normal"
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default VariantRow;
