import Loading from "@/components/shared/Loading";
import useFetchOrder from "../hooks/useFetchOrder";
import OrderDetailsCoreInfo from "./OrderDetailsCoreInfo";
import OrderDetailsCustomerInfo from "./OrderDetailsCustomerInfo";
import Error from "@/components/shared/Error";

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
    <section className="h-full p-regular space-y-md">
      <OrderDetailsCoreInfo
        createdAt={order?.createdAt || ""}
        total={order?.totalAmount || 0}
        quantity={order?.totalQuantity || 0}
        orderId={order?.id || 0}
      />

      <OrderDetailsCustomerInfo
        customerName={order?.userName || ""}
        email={order?.userEmail || ""}
        phone={order?.shipmentInfo.phoneNumber || ""}
      />
    </section>
  );
}

export default OrderDetails;
