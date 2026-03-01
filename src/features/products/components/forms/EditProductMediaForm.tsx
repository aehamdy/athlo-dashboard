import Heading from "@/components/shared/Heading";
import Icon from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTE_PATHS } from "@/routes/paths";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import useUpdateProductMedia from "../../hooks/useUpdateProductMedia";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";

interface Props {
  productId: number;
  productImages: string[];
}

function EditProductMediaForm({ productId, productImages }: Props) {
  const { mutate: updateMedia, isPending } = useUpdateProductMedia();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedOldUrl, setSelectedOldUrl] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImage(file);

    // Clear input so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOldUrl) {
      alert("Please select an image to replace.");
      return;
    }

    if (!newImage) {
      toast.warning("Please upload a new image");
      return;
    }

    const formData = new FormData();
    formData.append("productId", String(productId));
    formData.append("oldImageUrl", selectedOldUrl);
    formData.append("newImage", newImage);

    updateMedia(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col p-sm bg-white rounded-2xl"
    >
      <div className="container flex flex-col justify-between gap-base flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-regular items-center p-regular border-4 border-dashed border-accent-focus rounded-md">
          <div className="flex flex-col items-center gap-sm">
            <div className="p-4 bg-accent/25 rounded-full">
              <Icon name="ImagePlus" className="text-accent-strong" />
            </div>

            <Heading as="h3" className="text-zinc-700">
              Replace Product Image
            </Heading>

            <p className="text-sm text-gray-500 text-center w-full md:w-1/2">
              To replace a product image, first select one of the existing
              images below. Then upload a new image file that will replace the
              selected one. <br />
              Only one image can be replaced at a time.
            </p>

            <p className="text-center text-sm text-gray-400">
              Support JPG, JPEG, PNG or WEBP formats.
              <br />
              Recommended size: 1024*1024px, max 5MB per file.
            </p>
          </div>

          <div className="">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              type="button"
              disabled={!selectedOldUrl}
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="ImagePlus" />
              Select Files
            </Button>
          </div>
        </div>

        {/* Existing images preview */}
        <div className="flex flex-col gap-compact p-compact bg-neutral rounded-xl">
          <div className="flex items-center gap-sm">
            <Heading as="h3" className="text-xs font-semibold">
              Existing Images
            </Heading>

            <span className="py-tiny px-regular font-semibold text-neutral-muted bg-light-subtle rounded-full">
              {productImages.length}
            </span>
          </div>

          <div className="flex items-center gap-compact">
            {productImages.map((image, index) => {
              const isSelected = selectedOldUrl === image;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedOldUrl(image)}
                  className={`relative border rounded-md overflow-hidden cursor-pointer
        ${isSelected ? "ring-4 ring-accent" : ""}
      `}
                >
                  <img
                    src={image}
                    alt="Product"
                    className="w-full h-24 object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* New images preview */}
        {newImage && (
          <div className="flex flex-col gap-base p-compact bg-neutral rounded-xl">
            <Heading as="h3" className="text-lg font-semibold">
              New Image Preview
            </Heading>

            <div className="relative w-32 h-32 border rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(newImage)}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              <Button
                type="button"
                onClick={() => setNewImage(null)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full"
              >
                <Icon name="X" />
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t bg-white sticky bottom-0">
          <div className="container flex flex-col-reverse md:flex-row md:justify-between items-center gap-regular">
            <Link
              to={ROUTE_PATHS.dashboard.products}
              className="outline-link w-full md:w-fit"
            >
              <Icon name="ArrowLeft" />
              Back to Products
            </Link>

            <Button
              type="submit"
              disabled={isPending || !selectedOldUrl || !newImage}
              className="main-button w-full md:w-fit"
            >
              {isPending ? (
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
        </div>
      </div>
    </form>
  );
}

export default EditProductMediaForm;
