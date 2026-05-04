import type { ProductVariant } from '@/features/products/types';
import type { ProductWithVariants } from '@/features/inStoreOrders/types';
import ProductResultsTable from './ProductResultsTable';
import ProductSearchSection from './ProductSearchSection';

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  product: ProductWithVariants;
}

function ProductSearchAndResults({
  searchQuery,
  setSearchQuery,
  setSelectedItems,
  product,
}: Props) {
  return (
    <div>
      <ProductSearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ProductResultsTable
        setSelectedItems={setSelectedItems}
        product={product}
      />
    </div>
  );
}

export default ProductSearchAndResults;
