import type { ProductVariant } from '@/features/products/types';
import type { ProductWithVariants } from '@/features/inStoreOrders/types';
import ProductResultsTable from './ProductResultsTable';
import ProductSearchSection from './ProductSearchSection';

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  product: ProductWithVariants;
  isLoading: boolean;
}

function ProductSearchAndResults({
  searchQuery,
  setSearchQuery,
  setSelectedItems,
  product,
  isLoading,
}: Props) {
  return (
    <div>
      <ProductSearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ProductResultsTable
        isLoading={isLoading}
        setSelectedItems={setSelectedItems}
        product={product}
      />
    </div>
  );
}

export default ProductSearchAndResults;
