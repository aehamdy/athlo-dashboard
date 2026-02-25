import type { Product } from "@/types";

interface Props {
  product: Product;
}

function ProductMediaTab({ product }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Product Media</h2>

      <p className="text-sm text-muted-foreground">
        Manage product images and media for product #{product.id}.
      </p>
    </div>
  );
}

export default ProductMediaTab;
