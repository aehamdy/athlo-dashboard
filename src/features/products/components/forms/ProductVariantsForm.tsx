import {
  useForm,
  useFieldArray,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  productVariantsSchema,
  type ProductVariantsFormType,
} from '../../products.schema';
import { Button } from '@/components/ui/button';
import VariantsHeader from './VariantsHeader';
import VariantRow from './VariantRow';
import Icon from '@/components/shared/Icon';
import Heading from '@/components/shared/Heading';
import { toast } from 'sonner';
import { useAddProductVariants } from '../../hooks/useAddProductVariants';
import { isVariantsComplete } from '../../utils/isVariantsComplete';
import parseApiError from '../../utils/parseApiError';
import { useFetchProductById } from '../../hooks/useFetchProductById';

type Props = {
  productId: number;
  onBack: () => void;
  onSuccess: () => void;
};

function ProductVariantsForm({ productId, onBack, onSuccess }: Props) {
  const { data: product } = useFetchProductById(productId);
  const basePrice = product?.basePrice;
  const { submitVariants } = useAddProductVariants(productId);

  const form = useForm<ProductVariantsFormType>({
    resolver: zodResolver(productVariantsSchema),
    defaultValues: {
      variants: [
        {
          attributeValueEn: '',
          attributeValueAr: '',
          unit: '',
          colorCode: '',
          colorName: '',
          price: basePrice || 1,
          stockQuantity: 1,
        },
      ],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const variants = useWatch({ control: form.control, name: 'variants' });

  const allVariantsComplete = isVariantsComplete(variants);
  const { isSubmitting } = form.formState;

  const handleAddVariant = () => {
    append({
      attributeValueEn: '',
      attributeValueAr: '',
      unit: '',
      price: basePrice || 1,
      colorCode: '',
      colorName: '',
      stockQuantity: 1,
    });
  };

  const onSubmit = async (data: ProductVariantsFormType) => {
    try {
      await submitVariants(data);
      toast.success('Variants added successfully');
      onSuccess();
    } catch (error) {
      toast.error(parseApiError(error));
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-md h-full min-h-0 p-compact md:p-2xl bg-light rounded-2xl"
      >
        <div className="flex flex-col gap-base flex-1 min-h-0">
          <div className="flex flex-col md:flex-row justify-between gap-base md:gap-0 shrink-0">
            <div className="flex flex-col">
              <Heading as="h2">Add Prodcut Variants</Heading>

              <p className="text-muted-foreground">
                Define the sizes, colors, and stock levels for this item
              </p>
            </div>

            <Button
              type="button"
              className="w-full md:w-fit text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong border transform-colors duration-normal"
              onClick={handleAddVariant}
            >
              <Icon name="Plus" className="w-4 h-4" />
              Add Variant
            </Button>
          </div>

          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <VariantsHeader />

            <div className="flex-1 min-h-0 border md:border-t-none md:border-x md:border-b rounded-b-md overflow-y-auto">
              {fields.map((field, index) => (
                <VariantRow
                  key={field.id}
                  index={index}
                  remove={remove}
                  totalRows={fields.length}
                  basePrice={basePrice || 0}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-compact">
          <Button
            type="button"
            variant="secondary"
            className="w-fit text-dark/80 hover:text-dark active:text-dark hover:bg-accent active:bg-accent border border-accent hover:border-accent active:border-accent"
            disabled={isSubmitting}
            onClick={onBack}
          >
            <Icon name="ArrowLeft" />
            Previous
          </Button>

          <Button
            type="submit"
            className="w-fit text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong border border-accent transform-colors duration-normal"
            disabled={!allVariantsComplete || isSubmitting}
          >
            <Icon name="CircleCheck" className="text-dark" />
            Save Variants
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default ProductVariantsForm;
