import { Button } from '@/components/ui/button';
import OrderTotals from './OrderTotals';
import PaymentsAndNotes from './PaymentsAndNotes';
import SelectedItemsList from './SelectedItemsList';
import type { ProductVariant } from '@/features/products/types';
import { API_ENDPOINTS } from '@/api/endpoints';
import http from '@/api/http';
import { toast } from 'sonner';
import { useState } from 'react';
import Loading from '@/components/shared/Loading';

interface OrderSummaryProps {
  selectedItems: ProductVariant[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  paymentMethod: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<number>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  setInvoice: React.Dispatch<React.SetStateAction<number | null>>;
  resetOrder: () => void;
}

function OrderSummary({
  selectedItems,
  setSelectedItems,
  paymentMethod,
  setPaymentMethod,
  notes,
  setNotes,
  setInvoice,
  resetOrder,
}: OrderSummaryProps) {
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  const buildPayload = () => {
    return {
      paymentMethod,
      notes,
      items: selectedItems.map((item) => ({
        productVariantId: item.id,
        quantity: item.requestedQuantity,
      })),
    };
  };

  const handleCreateOrder = async () => {
    const payload = buildPayload();

    try {
      setIsLoadingOrder(true);

      const order = await http.post(
        API_ENDPOINTS.inStoreOrders.create,
        payload,
      );

      setInvoice(order.data.data);
      toast.success('Order created successfully');
      resetOrder();
    } catch (err) {
      toast.error('Failed to create order');
    } finally {
      setIsLoadingOrder(false);
    }
  };

  return (
    <section className="space-y-lg p-compact bg-light rounded-md">
      <SelectedItemsList
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />

      {/* Payment Methods & Note */}
      {selectedItems.length > 0 && (
        <PaymentsAndNotes
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          notes={notes}
          setNotes={setNotes}
        />
      )}

      {/* Summary */}
      <div className="space-y-base">
        <OrderTotals selectedItems={selectedItems} />

        <Button
          className="flex items-start w-full disabled:bg-gray-300"
          disabled={
            isLoadingOrder || selectedItems?.length === 0 || !paymentMethod
          }
          onClick={handleCreateOrder}
        >
          {isLoadingOrder ? (
            <div className="flex items-center gap-xs">
              <Loading /> Adding Order
            </div>
          ) : (
            'Add Order'
          )}
        </Button>
      </div>
    </section>
  );
}

export default OrderSummary;
