import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import type { ProductVariantsFormType } from '../../products.schema';
import { Label } from '@/components/ui/label';
import Currency from '@/components/shared/Currency';

interface VariantRowProps {
  index: number;
  remove: (index: number) => void;
  totalRows: number;
  basePrice: number;
}

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
    <div className="grid grid-cols-2 md:grid-cols-8 gap-2 md:gap-4 items-center mb-xs py-base bg-gray-50 px-xs border-b border-gray-200">
      <div className="md:hidden col-span-2 flex justify-between items-center pb-xs">
        <h4 className="text-sm font-semibold">
          Variant #{index + 1 > 9 ? index + 1 : `0${index + 1}`}
        </h4>

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

      <div className="col-span-1">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">
          Attr. Value (English)
        </Label>

        <Input
          {...register(`variants.${index}.attributeValueEn`)}
          placeholder="e.g. S, M, L"
          className="form-input"
        />
      </div>

      <div className="col-span-1">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">
          Attr. Value (Arabic)
        </Label>

        <Input
          {...register(`variants.${index}.attributeValueAr`)}
          placeholder="e.g. S, M, L"
          className="form-input"
        />
      </div>

      <div className="col-span-1">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">Unit</Label>

        <Input
          {...register(`variants.${index}.unit`)}
          placeholder="Unit"
          className="form-input"
        />
      </div>

      <div className="col-span-1">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">
          Color Name
        </Label>

        <Input
          {...register(`variants.${index}.colorName`)}
          placeholder="e.g. Red, Blue"
          className="form-input"
        />
      </div>

      <div className="col-span-1">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">
          Color Code
        </Label>

        <div className="flex items-center gap-base px-[6px] bg-gray-100 rounded-md">
          <Controller
            control={control}
            name={`variants.${index}.colorCode`}
            render={({ field }) => (
              <div className="flex justify-between items-center gap-compact">
                <div className="relative">
                  <div
                    className="w-8 h-6 border border-gray-400 rounded-xl shadow-sm"
                    style={{ backgroundColor: field.value || '#000000' }}
                  />
                  <input
                    type="color"
                    value={field.value || '#000000'}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <Input
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#000000"
                  className="color-code-input p-0 border-0 outline-0 ring-0 focus-visible:ring-0 shadow-none"
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="col-span-1">
        <Label className="md:hidden flex items-center gap-xs ms-xs mb-xs text-gray-400">
          Price <Currency />
        </Label>

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
                field.onChange(value === '' ? 0 : Number(value));
              }}
              placeholder="Price"
              className="form-input"
            />
          )}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Label className="md:hidden ms-xs mb-xs text-gray-400">Quantity</Label>

        <Input
          type="number"
          {...register(`variants.${index}.stockQuantity`, {
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
