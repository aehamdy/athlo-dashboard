import { useBrands } from '@/features/brands/hooks/useBrands';
import { useCategories } from '@/features/categories/hooks/useCategories';
import useUpdateProductInfo from '../../hooks/useUpdateProductInfo';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { Product, ProductForm } from '../../types';
import { ROUTE_PATHS } from '@/routes/paths';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import FormSelect from '@/components/shared/FormSelect';
import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import Loading from '@/components/shared/Loading';
import FormLabel from '@/components/shared/FormLabel';

interface Props {
  product: Product;
}

function EditProductInfoForm({ product }: Props) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const updateProduct = useUpdateProductInfo();
  const navigate = useNavigate();

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductForm>({
    defaultValues: {
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      clubEn: '',
      clubAr: '',
      categoryId: undefined,
      brandId: undefined,
      code: '',
      season: '',
      attributeKeyEn: '',
      attributeKeyAr: '',
      basePrice: undefined,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: ProductForm) => {
    const payload = {
      ...data,
      id: product.id,
      basePrice: Number(data.basePrice),
      categoryId: Number(data.categoryId),
      brandId: Number(data.brandId),
    };
    updateProduct.mutate(payload);
    navigate(ROUTE_PATHS.dashboard.products);
  };

  useEffect(() => {
    // Always reset first to clear any previous values
    reset({
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      clubEn: '',
      clubAr: '',
      categoryId: undefined,
      brandId: undefined,
      code: '',
      season: '',
      attributeKeyEn: '',
      attributeKeyAr: '',
      basePrice: undefined,
    });

    // Then populate if we have all the required data
    if (product && categories && brands) {
      // Use setTimeout to ensure reset happens first, then population
      setTimeout(() => {
        reset({
          nameEn: product.nameEn || '',
          nameAr: product.nameAr || '',
          descriptionEn: product.descriptionEn || '',
          descriptionAr: product.descriptionAr || '',
          clubEn: product.clubEn || '',
          clubAr: product.clubAr || '',
          categoryId: product.categoryId,
          brandId: product.brandId,
          code: product.code || '',
          season: product.season || '',
          attributeKeyEn: product.attributeKeyEn || '',
          attributeKeyAr: product.attributeKeyAr || '',
          basePrice: product.basePrice || 0,
        });
      }, 0);
    }
  }, [product.id, product, categories, brands, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-base w-full h-full overflow-y-auto bg-light rounded-lg"
    >
      <div className="space-y-base">
        <div className="flex flex-col md:flex-row gap-sm flex-wrap">
          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="nameEn">Name (English)</FormLabel>

            <Input
              {...register('nameEn', {
                required: 'English name is required',
              })}
              placeholder="Product name (English)"
              className="form-input"
            />

            {errors.nameEn && <span>{errors.nameEn.message}</span>}
          </div>

          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="nameAr">Name (Arabic)</FormLabel>

            <Input
              {...register('nameAr')}
              placeholder="اسم المنتج (العربية)"
              className="form-input"
            />

            {errors.nameAr && <span>{errors.nameAr.message}</span>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-sm flex-wrap">
          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="descriptionEn">Description (English)</FormLabel>

            <Input
              {...register('descriptionEn')}
              placeholder="Description (English)"
              className="form-input"
            />

            {errors.descriptionEn && (
              <span>{errors.descriptionEn.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="descriptionAr">Description (Arabic)</FormLabel>

            <Input
              {...register('descriptionAr')}
              placeholder="وصف المنتج (العربية)"
              className="form-input"
            />

            {errors.descriptionAr && (
              <span>{errors.descriptionAr.message}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center gap-regular">
          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="clubEn">Club (English)</FormLabel>

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

          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="clubAr">Club (Arabic)</FormLabel>

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
        </div>

        <div className="flex justify-between items-center gap-regular">
          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="categoryId">Category</FormLabel>

            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormSelect
                  placeholder="Select Category"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={categories || []}
                  error={errors.categoryId?.message}
                  disabled={categoriesLoading}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="brandId">Brand</FormLabel>

            <Controller
              control={control}
              name="brandId"
              render={({ field }) => (
                <FormSelect
                  placeholder="Select Brand"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={brands || []}
                  error={errors.brandId?.message}
                  disabled={brandsLoading}
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-regular">
          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="code">Product Code</FormLabel>

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

          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="season">Season</FormLabel>

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
        </div>

        <div className="flex justify-between items-center gap-regular">
          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="attributeKeyEn">
              Attribute Key (English)
            </FormLabel>

            <Input
              {...register('attributeKeyEn')}
              placeholder="e.g. Size, Color"
              className="form-input"
            />
          </div>

          <div className="flex flex-col gap-xs flex-1">
            <FormLabel htmlFor="attributeKeyAr">
              Attribute Key (Arabic)
            </FormLabel>

            <Input
              {...register('attributeKeyAr')}
              placeholder="مثال: المقاس، اللون"
              className="form-input"
            />
          </div>
        </div>

        <div className="flex flex-col gap-xs">
          <FormLabel htmlFor="basePrice">Base Price ($)</FormLabel>

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

      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center gap-regular">
        <Link
          to={ROUTE_PATHS.dashboard.products}
          className="outline-link w-full md:w-fit"
        >
          <Icon name="ArrowLeft" />
          Back to Products
        </Link>

        <Button
          type="submit"
          disabled={updateProduct.isPending || !isValid}
          className={`main-button flex justify-self-end w-full md:w-fit ${(updateProduct.isPending || !isValid) && 'cursor-not-allowed'}`}
        >
          {updateProduct.isPending ? (
            <div className="flex items-center gap-sm">
              <Loading /> Updating...
            </div>
          ) : (
            <div className="flex items-center gap-sm">
              <Icon name="CircleCheck" />
              Update & Save
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}

export default EditProductInfoForm;
