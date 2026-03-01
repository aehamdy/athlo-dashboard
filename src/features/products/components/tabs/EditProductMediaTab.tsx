import Heading from "@/components/shared/Heading";
import type { Product } from "@/features/products/types";
import EditProductMediaForm from "../forms/EditProductMediaForm";
import Loading from "@/components/shared/Loading";
import useFetchProductMediaAndVariants from "../../hooks/useFetchProductMediaAndVariants";

interface Props {
  product: Product;
}

function EditProductMediaTab({ product }: Props) {
  const { data: productData } = useFetchProductMediaAndVariants(product.id);

  return (
    <div className="flex flex-col h-full space-y-sm min-h-0">
      <div>
        <Heading as="h2" className="text-lg font-semibold">
          Product Media
        </Heading>

        <p className="text-sm text-muted-foreground">
          Replace existing images with new ones.
        </p>
      </div>

      <div className="flex-1 min-h-0">
        {productData ? (
          <EditProductMediaForm
            productId={product.id}
            productImages={productData.images}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default EditProductMediaTab;
