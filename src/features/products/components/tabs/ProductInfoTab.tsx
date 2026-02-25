import type { Product } from "@/features/products/types";

interface Props {
  product: Product;
}

function ProductInfoTab({ product }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Basic Information</h2>

      {/* Replace with your actual form */}
      <p className="text-sm text-muted-foreground">
        Edit general product information for product #{product.id}.
      </p>
    </div>
  );
}

export default ProductInfoTab;
