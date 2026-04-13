import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import {
  productImagesSchema,
  type ProductImagesFormType,
} from '../../products.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  ImagePlus,
  Star,
  X,
} from 'lucide-react';
import Heading from '@/components/shared/Heading';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import Loading from '@/components/shared/Loading';
import { useUploadProductImages } from '../../hooks/useUploadProductImages';

type Props = {
  productId: number;
  onBack: () => void;
  onSuccess: () => void;
};

function ProductImagesForm({ productId, onBack, onSuccess }: Props) {
  const form = useForm<ProductImagesFormType>({
    resolver: zodResolver(productImagesSchema),
    defaultValues: {
      images: [],
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = form.watch('images');
  const navigate = useNavigate();
  const uploadMutation = useUploadProductImages();
  const [activeButton, setActiveButton] = useState<
    'finish' | 'variants' | null
  >(null);

  useEffect(() => {
    const urls = images?.map((file) => URL.createObjectURL(file)) || [];

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleUpload = async (nextStep: 'finish' | 'variants') => {
    setActiveButton(nextStep);

    const data = form.getValues();

    uploadMutation.mutate(
      { productId, data },
      {
        onSuccess: () => {
          if (nextStep === 'finish') {
            navigate(ROUTE_PATHS.dashboard.products);
          } else if (nextStep === 'variants') {
            onSuccess();
          }
          setActiveButton(null);
        },
        onError: () => setActiveButton(null),
      },
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full h-full p-compact md:p-2xl bg-white rounded-2xl"
    >
      <div className="flex flex-col justify-between gap-base h-full">
        <div className="flex flex-col gap-regular items-center p-8 border-4 border-dashed border-accent-focus rounded-md">
          <div className="flex flex-col items-center gap-regular">
            <div className="p-4 bg-accent/25 rounded-full">
              <ImagePlus className="text-accent-strong" />
            </div>

            <Heading as="h3" className="text-zinc-700">
              Add Images
            </Heading>

            <p className="my-sm text-center text-sm text-gray-400">
              Support JPEG, PNG or WEB formats.
              <br />
              Recommended size: 1024*1024px, max 5MB per file.
            </p>
          </div>

          <div className="">
            <Input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) =>
                form.setValue('images', Array.from(e.target.files || []), {
                  shouldValidate: true,
                })
              }
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 p-4 text-black bg-accent hover:bg-accent-soft hover:scale-105 transition duration-normal rounded-md cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="w-4 h-4" />
              Select Files
            </Button>
          </div>
        </div>

        {images && images.length > 0 && (
          <div className="flex flex-col gap-base px-base">
            <div className="">
              <Heading as="h3" className="text-zinc-700">
                Uploaded Images
              </Heading>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded-md overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-34 object-cover"
                  />

                  {index === 0 && (
                    <div className="absolute top-sm start-sm flex justify-between items-center gap-tiny p-tiny bg-accent-strong rounded-md">
                      <Star className="w-regular h-regular fill-dark" />

                      <span className="hidden lg:block font-semibold text-tiny text-dark/80 tracking-[0.2rem] uppercase">
                        Primary
                      </span>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={() => {
                      const updated = images.filter((_, i) => i !== index);
                      form.setValue('images', updated, {
                        shouldValidate: true,
                      });
                    }}
                    className="absolute top-tiny end-tiny text-xs bg-black/60 text-white rounded-full cursor-pointer"
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-compact">
          <div className="col-span-12 md:col-start-10 md:col-end-13 md:order-3">
            <Button
              type="button"
              className="w-full text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong border border-accent disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-70 transform-colors duration-normal"
              disabled={uploadMutation.isPending || !images?.length}
              onClick={() => handleUpload('variants')}
            >
              {uploadMutation.isPending && activeButton === 'variants' ? (
                <div className="flex items-center gap-xs">
                  <Loading />
                  Processing...
                </div>
              ) : (
                <>
                  Continue to Variants
                  <ArrowRight />
                </>
              )}
            </Button>
          </div>

          <div className="col-span-6 md:col-start-1 md:col-end-3 md:order-1 w-full">
            <Button
              type="button"
              variant="ghost"
              className="w-full text-dark/80 hover:text-dark active:text-dark hover:bg-accent active:bg-accent border border-accent hover:border-accent active:border-accent"
              disabled={uploadMutation.isPending}
              onClick={onBack}
            >
              <ArrowLeft />
              Previous
            </Button>
          </div>

          <div className="col-span-6 md:col-start-7 md:col-end-10 md:order-2 w-full">
            <Button
              type="button"
              variant="outline"
              className="group w-full hover:bg-accent-soft active:bg-accent-strong border border-accent disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-70 transform-colors duration-normal cursor-pointer"
              disabled={uploadMutation.isPending || !images?.length}
              onClick={() => handleUpload('finish')}
            >
              {uploadMutation.isPending && activeButton === 'finish' ? (
                <div className="flex items-center gap-xs">
                  <Loading />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-xs">
                  <CircleCheck className="text-accent group-hover:text-dark group-active:text-dark transform-colors duration-normal" />
                  Save & Finish
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductImagesForm;
