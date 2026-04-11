import {
  productInfoSchema,
  type ProductInfoFormType,
} from '../../products.schema';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import http from '@/api/http';
import { API_ENDPOINTS } from '@/api/endpoints';
import { ArrowRight } from 'lucide-react';
import Heading from '@/components/shared/Heading';
import useBrands from '@/features/brands/api/useBrands';
import type { Brand, Category } from '@/types';
import FormSelect from '@/components/shared/FormSelect';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { toast } from 'sonner';

type Props = {
  onSuccess: (id: number) => void;
};

function ProductInfoForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProductInfoFormType>({
    resolver: zodResolver(productInfoSchema),
    mode: 'onChange',
    defaultValues: {
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      clubEn: '',
      clubAr: '',
      season: '',
      code: '',
      categoryId: undefined,
      brandId: undefined,
      attributeKeyEn: '',
      attributeKeyAr: '',
      basePrice: 0,
    },
  });

  const categoryId = useWatch({ control, name: 'categoryId' });
  const brandId = useWatch({ control, name: 'brandId' });

  const { data: brands = [], isLoading: brandsLoading } = useBrands() as {
    data: Brand[];
    isLoading: boolean;
  };
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories() as { data: Category[]; isLoading: boolean };

  const onSubmit = async (data: ProductInfoFormType) => {
    try {
      const res = await http.post(API_ENDPOINTS.products.create, data);
      onSuccess(res.data.data);
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: {
              Message?: string;
              StatusCode?: number;
              Errors?: Record<string, string[]>;
            };
            status?: number;
          };
        };

        toast.error(axiosError.response?.data?.Message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-compact h-full p-regular md:p-lg bg-light">
      <Heading as="h3" className="mb-base text-zinc-700">
        Create New Product
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-base w-full h-full  bg-light rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div className="flex flex-col">
            <Input
              {...register('nameEn')}
              placeholder="Product name (English)"
              className="form-input"
            />
            {errors.nameEn && (
              <span className="text-red-600 text-sm mt-1">
                {errors.nameEn.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('nameAr')}
              placeholder="اسم المنتج (العربية)"
              className="form-input"
            />
            {errors.nameAr && (
              <span className="text-red-600 text-sm mt-1">
                {errors.nameAr.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('descriptionEn')}
              placeholder="Description (English)"
              className="form-input"
            />
            {errors.descriptionEn && (
              <span className="text-red-600 text-sm mt-1">
                {errors.descriptionEn.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('descriptionAr')}
              placeholder="وصف المنتج (العربية)"
              className="form-input"
            />
            {errors.descriptionAr && (
              <span className="text-red-600 text-sm mt-1">
                {errors.descriptionAr.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('clubEn')}
              placeholder="Club (English)"
              className="form-input"
            />
            {errors.clubEn && (
              <span className="text-red-600 text-sm mt-1">
                {errors.clubEn.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('clubAr')}
              placeholder="النادي (العربية)"
              className="form-input"
            />
            {errors.clubAr && (
              <span className="text-red-600 text-sm mt-1">
                {errors.clubAr.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <FormSelect
              placeholder="Select Category"
              value={categoryId?.toString() ?? ''}
              onValueChange={(val) =>
                setValue('categoryId', Number(val), { shouldValidate: true })
              }
              options={categories}
              error={errors.categoryId?.message}
              disabled={categoriesLoading}
            />
          </div>

          <div className="flex flex-col">
            <FormSelect
              placeholder="Select Brand"
              value={brandId?.toString() ?? ''}
              onValueChange={(val) =>
                setValue('brandId', Number(val), { shouldValidate: true })
              }
              options={brands}
              error={errors.brandId?.message}
              disabled={brandsLoading}
            />
          </div>

          <div className="flex flex-col">
            <Input
              {...register('code')}
              placeholder="Product Code"
              className="form-input"
            />
            {errors.code && (
              <span className="text-red-600 text-sm mt-1">
                {errors.code.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('season')}
              placeholder="Season"
              className="form-input"
            />
            {errors.season && (
              <span className="text-red-600 text-sm mt-1">
                {errors.season.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('attributeKeyEn')}
              placeholder="Attribute Label (English)"
              className="form-input"
            />
          </div>
          <div className="flex flex-col">
            <Input
              {...register('attributeKeyAr')}
              placeholder="Attribute Label (Arabic)"
              className="form-input"
            />
          </div>

          <div className="flex flex-col">
            <Input
              type="number"
              {...register('basePrice')}
              placeholder="Base Price"
              className="form-input"
            />

            {errors.basePrice && (
              <span className="text-red-600 text-sm mt-1">
                {errors.basePrice.message}
              </span>
            )}
          </div>
        </div>

        <div className="">
          <Button
            type="submit"
            variant="plain"
            disabled={isSubmitting || !isValid}
            className={`main-button flex justify-self-end ${(isSubmitting || !isValid) && 'cursor-not-allowed'}`}
          >
            {isSubmitting && (
              <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                Next: Media <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductInfoForm;
