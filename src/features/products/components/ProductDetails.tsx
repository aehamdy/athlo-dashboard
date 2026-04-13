import ProductImages from './ProductImages';
import { useFetchProductById } from '../hooks/useFetchProductById';
import ProductGeneralInfo from './ProductGeneralInfo';
import ProductReviews from './ProductReviews';
import ProductVariants from './ProductVariants';
import ProductDetailsSkeleton from './skeletons/ProductDetailsSkeleton';

type ProductDetailsProps = {
  productId: number;
};

function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading: isLoadingProduct } =
    useFetchProductById(productId);

  if (isLoadingProduct || !product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <section className="">
      <section className="h-full pt-sm">
        <ProductImages images={product.images} productName={product.nameEn} />

        <ProductGeneralInfo product={product} />

        <ProductVariants variants={product.variants} productId={product.id} />

        <ProductReviews productId={product.id} />
      </section>
    </section>
  );
}

export default ProductDetails;
