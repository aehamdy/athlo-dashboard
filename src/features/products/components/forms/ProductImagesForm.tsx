import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import http from "@/api/http";
import { productImagesSchema, type ProductImagesFormType } from "../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  ImagePlus,
  Star,
  X,
} from "lucide-react";
import Heading from "@/components/shared/Heading";
import { API_ENDPOINTS } from "@/api/endPoints";

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
  const [pending, setPending] = useState(false);
  const images = form.watch("images");

  const onSubmit = async (data: ProductImagesFormType) => {
    try {
      setPending(true);

      const formData = new FormData();

      formData.append("productId", productId.toString());

      data.images.forEach((img) => {
        formData.append("Images", img);
      });

      await http.post(API_ENDPOINTS.products.addImages, formData);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const urls = images?.map((file) => URL.createObjectURL(file)) || [];

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-full p-compact md:p-2xl bg-white rounded-2xl"
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
                form.setValue("images", Array.from(e.target.files || []), {
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
                      form.setValue("images", updated, {
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

          <div className="flex flex-col md:flex-row items-center gap-regular w-full md:w-fit">
            <Button
              type="submit"
              variant="plain"
              disabled={pending}
              className="group w-full md:w-fit hover:bg-accent-soft active:bg-accent-strong border border-accent transform-colors duration-normal"
            >
              <CircleCheck className="text-accent group-hover:text-dark group-active:text-dark transform-colors duration-normal" />
              Save & Finish
            </Button>

            <Button
              type="button"
              variant="plain"
              className="w-full md:w-fit text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong border border-accent transform-colors duration-normal"
              onClick={onSuccess}
            >
              Continue to Variants
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductImagesForm;
