import { Button } from '@/components/ui/button';
import OrderTotals from './OrderTotals';
import PaymentsAndNotes from './PaymentsAndNotes';
import SelectedItemsList from './SelectedItemsList';
import type { ProductVariant } from '@/features/products/types';
import { API_ENDPOINTS } from '@/api/endpoints';
import http from '@/api/http';
import { toast } from 'sonner';

interface OrderSummaryProps {
  selectedItems: ProductVariant[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
  paymentMethod: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<number>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

function OrderSummary({
  selectedItems,
  setSelectedItems,
  paymentMethod,
  setPaymentMethod,
  notes,
  setNotes,
}: OrderSummaryProps) {
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
      await http.post(API_ENDPOINTS.inStoreOrders.create, payload);

      toast.success('Order created successfully');
    } catch (err) {
      toast.error('Failed to create order');
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
          className="w-full disabled:bg-gray-300"
          disabled={selectedItems?.length === 0 || !paymentMethod}
          onClick={handleCreateOrder}
        >
          Complete Order
        </Button>
      </div>
    </section>
  );
}

export default OrderSummary;
