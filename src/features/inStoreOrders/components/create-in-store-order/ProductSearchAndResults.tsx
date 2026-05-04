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
  isError: boolean;
}

function ProductSearchAndResults({
  searchQuery,
  setSearchQuery,
  setSelectedItems,
  product,
  isLoading,
  isError,
}: Props) {
  return (
    <div>
      <ProductSearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ProductResultsTable
        isLoading={isLoading}
        isError={isError}
        setSelectedItems={setSelectedItems}
        product={product}
      />
    </div>
  );
}

export default ProductSearchAndResults;
