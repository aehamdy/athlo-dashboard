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
import type { ProductVariantsFormType } from "../../schemas";

interface VariantRowProps {
  index: number;
  remove: (index: number) => void;
  totalRows: number;
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

function VariantRow({ index, remove, totalRows }: VariantRowProps) {
  const { register, control } = useFormContext<ProductVariantsFormType>();

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-2 px-xs border-b border-gray-200 pb-2">
      <div className="col-span-2">
        <Controller
          control={control}
          name={`variants.${index}.size`}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
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

      <div className="col-span-3">
        <Input
          {...register(`variants.${index}.color`)}
          placeholder="Color Name"
          className="form-input"
        />
      </div>

      <div className="col-span-2">
        <Input
          type="color"
          {...register(`variants.${index}.colorCode`)}
          className="form-input"
        />
      </div>

      <div className="col-span-2">
        <Input
          type="number"
          {...register(`variants.${index}.price`, {
            valueAsNumber: true,
          })}
          placeholder="Price"
          className="form-input"
        />
      </div>

      <div className="col-span-2">
        <Input
          type="number"
          {...register(`variants.${index}.stock`, {
            valueAsNumber: true,
          })}
          placeholder="Stock"
          className="form-input"
        />
      </div>

      <div className="col-span-1 flex justify-center">
        {totalRows > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
            className="group"
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
