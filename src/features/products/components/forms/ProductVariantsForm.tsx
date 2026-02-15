import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productVariantsSchema,
  type ProductVariantsFormType,
} from "../../schemas";
import http from "@/api/http";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleCheck, Plus, Trash2 } from "lucide-react";

type Props = {
  productId: number;
  onBack: () => void;
  onSuccess: () => void;
};

function ProductVariantsForm({ productId, onBack, onSuccess }: Props) {
  const form = useForm<ProductVariantsFormType>({
    resolver: zodResolver(productVariantsSchema),
    defaultValues: {
      variants: [{ size: "", color: "", price: 0, stock: 0 }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const submit: (data: ProductVariantsFormType) => Promise<void> = async (
    data,
  ) => {
    try {
      await http.post(`/products/${productId}/variants`, data.variants);
      onSuccess();
    } catch (error) {
      console.error("Error submitting variants:", error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      className="h-full p-compact md:p-2xl bg-light rounded-2xl"
    >
      <div className="flex flex-col justify-between gap-base h-full">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="plain"
            className="w-full md:w-fit text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong border border-accent transform-colors duration-normal"
            onClick={() => append({ size: "", color: "", price: 0, stock: 0 })}
          >
            <Plus className="w-4 h-4" />
            Add Variant
          </Button>
        </div>

        <div className="flex flex-col gap-base h-full ">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-4 gap-4 items-end border-b border-gray-200 pb-2 mb-2"
            >
              <div className="flex flex-col">
                <label className="text-sm font-medium">Size</label>
                <input
                  {...form.register(`variants.${index}.size`)}
                  className="form-input"
                  placeholder="Size"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Color</label>
                <input
                  {...form.register(`variants.${index}.color`)}
                  className="form-input"
                  placeholder="Color"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Price</label>
                <input
                  type="number"
                  {...form.register(`variants.${index}.price`, {
                    valueAsNumber: true,
                  })}
                  className="form-input"
                  placeholder="Price"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-sm font-medium">Stock</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    {...form.register(`variants.${index}.stock`, {
                      valueAsNumber: true,
                    })}
                    className="form-input"
                    placeholder="Stock"
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="plain"
                      className="flex items-center justify-center h-7 w-7 bg-gray-300"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-compact">
          <Button
            type="button"
            variant="plain"
            className="w-full md:w-fit text-dark/80 hover:text-dark active:text-dark hover:bg-accent active:bg-accent border border-accent hover:border-accent active:border-accent"
            onClick={onBack}
          >
            <ArrowLeft />
            Previous
          </Button>

          <Button
            type="submit"
            variant="plain"
            className="w-full md:w-fit text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong border border-accent transform-colors duration-normal"
            // onClick={onBack}
          >
            <CircleCheck className="text-dark" />
            Save Variants
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProductVariantsForm;
