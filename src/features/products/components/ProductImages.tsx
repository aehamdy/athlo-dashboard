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
      <div
        className={`grid ${images.length > 1 ? 'grid-cols-3' : 'grid-cols-1'} gap-sm h-75`}
      >
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
          <div className="flex flex-col gap-sm overflow-y-auto">
            {images.length > 0 &&
              images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="shrink-0 h-30 border border-subtle rounded-md overflow-hidden"
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
