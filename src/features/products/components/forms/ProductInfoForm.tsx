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
import FormLabel from '@/components/shared/FormLabel';

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
    <div className="flex flex-col gap-compact w-full h-full p-regular md:p-lg bg-light overflow-y-auto">
      <Heading as="h3" className="mb-base text-zinc-700">
        Create New Product
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-base w-full h-full  bg-light rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="nameEn" required>
              Product Name (English)
            </FormLabel>

            <Input
              {...register('nameEn')}
              placeholder="e.g. Real Madrid Home Jersey"
              className="form-input"
            />

            {errors.nameEn && (
              <span className="text-red-600 text-sm mt-1">
                {errors.nameEn.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="nameAr" required>
              Product Name (Arabic)
            </FormLabel>

            <Input
              {...register('nameAr')}
              placeholder="مثال: قميص ريال مدريد الأساسي"
              className="form-input"
            />

            {errors.nameAr && (
              <span className="text-red-600 text-sm mt-1">
                {errors.nameAr.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="descriptionEn" required>
              Description (English)
            </FormLabel>

            <Input
              {...register('descriptionEn')}
              placeholder="e.g. Official 2024/25 home kit made from breathable fabric"
              className="form-input"
            />
            {errors.descriptionEn && (
              <span className="text-red-600 text-sm mt-1">
                {errors.descriptionEn.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="descriptionAr" required>
              Description (Arabic)
            </FormLabel>

            <Input
              {...register('descriptionAr')}
              placeholder="مثال: الطقم الأساسي الرسمي لموسم 2024/2025 مصنوع من قماش مريح"
              className="form-input"
            />

            {errors.descriptionAr && (
              <span className="text-red-600 text-sm mt-1">
                {errors.descriptionAr.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="clubEn">Club (English)</FormLabel>

            <Input
              {...register('clubEn')}
              placeholder="e.g. Real Madrid"
              className="form-input"
            />

            {errors.clubEn && (
              <span className="text-red-600 text-sm mt-1">
                {errors.clubEn.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="clubAr">Club (Arabic)</FormLabel>

            <Input
              {...register('clubAr')}
              placeholder="مثال: ريال مدريد"
              className="form-input"
            />

            {errors.clubAr && (
              <span className="text-red-600 text-sm mt-1">
                {errors.clubAr.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="categoryId" required>
              Category
            </FormLabel>

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

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="brandId" required>
              Brand
            </FormLabel>

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

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="code" required>
              Product Code
            </FormLabel>

            <Input
              {...register('code')}
              placeholder="e.g. RM-HOME-24"
              className="form-input"
            />

            {errors.code && (
              <span className="text-red-600 text-sm mt-1">
                {errors.code.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="season" required>
              Season
            </FormLabel>

            <Input
              {...register('season')}
              placeholder="e.g. 2024/2025"
              className="form-input"
            />

            {errors.season && (
              <span className="text-red-600 text-sm mt-1">
                {errors.season.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="attributeKeyEn">
              Attribute Label (English)
            </FormLabel>

            <Input
              {...register('attributeKeyEn')}
              placeholder="e.g. Size, Color"
              className="form-input"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="attributeKeyAr">
              Attribute Label (Arabic)
            </FormLabel>

            <Input
              {...register('attributeKeyAr')}
              placeholder="مثال: المقاس، اللون"
              className="form-input"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <FormLabel htmlFor="basePrice" required>
              Base Price
            </FormLabel>

            <Input
              type="number"
              {...register('basePrice')}
              placeholder="e.g. 100"
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
