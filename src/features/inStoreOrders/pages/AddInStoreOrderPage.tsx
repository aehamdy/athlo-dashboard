import { useState } from 'react';
import useFetchVariants from '../hooks/useFetchVariants';
import type { ProductVariant } from '@/features/products/types';
import { paymentMethods } from '../constants';
import OrderSummary from '../components/create-in-store-order/OrderSummary';
import ProductSearchAndResults from '../components/create-in-store-order/ProductSearchAndResults';

function AddInStoreOrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<ProductVariant[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<number>(
    Number(paymentMethods[0].value),
  );
  const [notes, setNotes] = useState('');

  const { data: product, isLoading, isError } = useFetchVariants(searchQuery);

  return (
    <section className="grid lg:grid-cols-12 gap-compact w-full">
      <section className="lg:col-span-8 space-y-regular md:p-compact bg-light rounded-md h-full">
        <ProductSearchAndResults
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedItems={setSelectedItems}
          product={product}
        />
      </section>

      <section className="lg:col-span-4">
        <OrderSummary
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          notes={notes}
          setNotes={setNotes}
        />
      </section>
    </section>
  );
}

export default AddInStoreOrderPage;
