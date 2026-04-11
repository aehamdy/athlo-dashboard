import Heading from '@/components/shared/Heading';
import type { Product } from '@/features/products/types';
import useFetchProductInfo from '../../hooks/useFetchProductInfo';
import EditProductInfoForm from '../forms/EditProductInfoForm';
import Loading from '@/components/shared/Loading';

interface Props {
  product: Product;
}

function EditProductInfoTab({ product }: Props) {
  const { data: productData } = useFetchProductInfo(product.id);

  return (
    <section className="flex flex-col h-full gap-base overflow-hidden">
      <div className="">
        <Heading as="h2" className="text-lg font-semibold">
          Basic Information
        </Heading>

        <p className="text-sm text-muted-foreground">
          Edit and update the information details of your item.
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        {productData ? (
          <EditProductInfoForm product={productData} />
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}

export default EditProductInfoTab;
