import type { Product } from "@/types";

interface Props {
  product: Product;
}

function ProductVariantsTab({ product }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Product Variants</h2>

      <p className="text-sm text-muted-foreground">
        Manage size, color, stock, and pricing for product #{product.id}.
      </p>
    </div>
  );
}

export default ProductVariantsTab;
