import AppImage from '@/components/shared/AppImage';
import { Badge } from '@/components/ui/badge';

function ProductImages({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  return (
    <section className="p-sm border-b">
      <div className="h-50 grid grid-cols-3 gap-sm">
        <div className="relative col-span-2 rounded-md overflow-hidden">
          {images.length > 0 && <AppImage src={images[0]} alt={productName} />}

          <Badge
            variant="secondary"
            className="absolute top-2 start-2 bg-gray-200 rounded-md"
          >
            Main Image
          </Badge>
        </div>

        {images.length > 1 && (
          <div className="col-span-1 flex flex-col gap-sm h-full overflow-y-auto">
            {images.length > 0 &&
              images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="col-span-1 h-4/10 rounded-md overflow-hidden"
                >
                  <AppImage src={image} alt={productName} />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductImages;
