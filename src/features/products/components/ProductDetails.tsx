import ProductImages from './ProductImages';
import { useFetchProductById } from '../hooks/useFetchProductById';
import Loading from '@/components/shared/Loading';
import ProductGeneralInfo from './ProductGeneralInfo';
import ProductReviews from './ProductReviews';
import ProductVariants from './ProductVariants';

type ProductDetailsProps = {
  productId: number;
};

function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading: isLoadingProduct } =
    useFetchProductById(productId);

  if (isLoadingProduct || !product) {
    return <Loading size="normal" />;
  }

  return (
    <section className="">
      <section className="h-full">
        <ProductImages images={product.images} productName={product.nameEn} />

        <ProductGeneralInfo product={product} />

        <ProductVariants variants={product.variants} />

        <ProductReviews productId={product.id} />
      </section>
    </section>
  );
}

export default ProductDetails;
