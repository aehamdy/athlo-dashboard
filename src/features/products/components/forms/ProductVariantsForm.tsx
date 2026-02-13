import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productVariantsSchema,
  type ProductVariantsFormType,
} from "../../schemas";
import http from "@/api/http";

type Props = {
  productId: number;
  onBack: () => void;
};

function ProductVariantsForm({ productId, onBack }: Props) {
  const form = useForm<ProductVariantsFormType>({
    resolver: zodResolver(productVariantsSchema),
    defaultValues: {
      variants: [{ size: "", color: "", stock: 0 }],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const submit = async (data: ProductVariantsFormType) => {
    await http.post(`/products/${productId}/variants`, data.variants);
    alert("Product created 🎉");
  };

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      {fields.map((field, i) => (
        <div key={field.id}>
          <input {...form.register(`variants.${i}.size`)} />
          <input {...form.register(`variants.${i}.color`)} />
          <input
            type="number"
            {...form.register(`variants.${i}.stock`, {
              valueAsNumber: true,
            })}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ size: "", color: "", stock: 0 })}
      >
        Add Variant
      </button>

      <button type="button" onClick={onBack}>
        Back
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductVariantsForm;
