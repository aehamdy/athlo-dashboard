import Loading from '@/components/shared/Loading';
import useFetchOrder from '../hooks/useFetchOrder';
import OrderDetailsCoreInfo from './OrderDetailsCoreInfo';
import OrderDetailsCustomerInfo from './OrderDetailsCustomerInfo';
import Error from '@/components/shared/Error';
import OrderDetailsShippingInfo from './OrderDetailsShippingInfo';
import OrderDetailsProducts from './OrderDetailsProducts';

type OrderDetailsProps = {
  orderId: number;
};

function OrderDetails({ orderId }: OrderDetailsProps) {
  const { data: order, isLoading, isError } = useFetchOrder(orderId);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Error title="Failed to load order" message="Please try again later" />
    );

  return (
    <section className="h-full p-regular space-y-md overflow-y-auto">
      <OrderDetailsCoreInfo
        createdAt={order?.createdAt || ''}
        total={order?.totalAmount || 0}
        quantity={order?.totalQuantity || 0}
        orderId={order?.id || 0}
        orderStatus={order?.status || ''}
      />

      <OrderDetailsCustomerInfo
        customerName={order?.userName || ''}
        email={order?.userEmail || ''}
      />

      <OrderDetailsShippingInfo
        city={order?.shipmentInfo?.city}
        country={order?.shipmentInfo?.country}
        region={order?.shipmentInfo?.region}
        streetAddress={order?.shipmentInfo?.streetAddress}
        buildingNumber={order?.shipmentInfo?.buildingNumber}
        floor={order?.shipmentInfo?.floorNumber}
        apartmentNumber={order?.shipmentInfo?.apartmentNumber}
        phoneNumber={order?.shipmentInfo?.phoneNumber}
        method={order?.shipmentInfo?.shippingMethod}
        shipmentStatus={order?.shipmentInfo?.shipmentStatus}
        trackingNumber={order?.shipmentInfo?.trackingNumber}
        notes={order?.shipmentInfo?.notes}
      />

      <OrderDetailsProducts order={order} />
    </section>
  );
}

export default OrderDetails;
