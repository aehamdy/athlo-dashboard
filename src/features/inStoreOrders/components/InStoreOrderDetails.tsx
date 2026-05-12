import Loading from '@/components/shared/Loading';
import useFetchInStoreOrder from '../hooks/useFetchInStoreOrder';
import Error from '@/components/shared/Error';
import Icon from '@/components/shared/Icon';
import Heading from '@/components/shared/Heading';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/utils/formatDateTime';
import Currency from '@/components/shared/Currency';
import InStoreOrderDetailsItemsList from './InStoreOrderDetailsItemsList';

type InStoreOrderDetailsProps = {
  orderId: number;
};

function InStoreOrderDetails({ orderId }: InStoreOrderDetailsProps) {
  const { data: order, isLoading, isError } = useFetchInStoreOrder(orderId);

  if (isLoading) return <Loading />;

  if (isError || !order)
    return (
      <Error title="Order not found" message="Failed to load order details" />
    );

  const { date: orderDate, time: orderTime } = formatDateTime(order?.saleDate);

  return (
    <section className="h-full p-regular space-y-md overflow-y-auto">
      <div className="space-y-sm">
        <div className="flex justify-between items-center pb-xs border-b">
          <div className="flex items-center gap-sm">
            <Icon name="Info" className="text-gray-400" />

            <Heading
              as="h3"
              className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Core Info
            </Heading>
          </div>

          <Badge
            variant="outline"
            className={`py-tiny text-green-600 bg-green-100 border-0 rounded-md`}
          >
            {order.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-sm">
          <div className="flex flex-col gap-sm bg-gray-50 p-compact rounded-md">
            <Heading
              as="h5"
              className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Order Quantity
            </Heading>

            <p className="font-semibold text-xs text-gray-700">
              {order.items.length}
            </p>
          </div>

          <div className="flex flex-col gap-sm bg-gray-50 p-compact rounded-md">
            <Heading
              as="h5"
              className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Total Amount
            </Heading>

            <div className="flex justify-between items-center font-semibold">
              {order.discountAmount > 0 && (
                <span className="text-xs line-through">
                  {order.totalAmount}
                </span>
              )}

              {order.discountAmount > 0 && (
                <span className="text-sm text-red-500">
                  {order.discountAmount}
                </span>
              )}

              <span className="flex items-center gap-tiny text-lg">
                <Currency symbol />
                {order.finalAmount}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-sm bg-gray-50 p-compact rounded-md">
            <Heading
              as="h5"
              className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Order No.
            </Heading>

            <p className="font-semibold text-xs text-gray-700">
              #{order.saleNumber}
            </p>
          </div>

          <div className="flex flex-col gap-sm bg-gray-50 p-compact rounded-md">
            <Heading
              as="h5"
              className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Date & Payment Method
            </Heading>

            <div className="flex justify-between items-center">
              <p className="font-medium text-xs text-blue-500">
                {orderDate} - {orderTime}
              </p>

              <p className="px-sm font-semibold text-sm text-gray-700 bg-gray-100 rounded-sm">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="p-compact bg-gray-50 rounded-md">
            <Heading
              as="h5"
              className="mb-sm font-semibold text-sm md:text-tiny text-gray-400 uppercase tracking-widest"
            >
              Notes
            </Heading>

            <p className="font-medium text-sm text-gray-700">{order.notes}</p>
          </div>
        )}
      </div>

      <InStoreOrderDetailsItemsList order={order} />
    </section>
  );
}

export default InStoreOrderDetails;
