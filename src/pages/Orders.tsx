import { API_ENDPOINTS } from "@/api/endPoints";
import AddOrderForm from "@/components/AddOrderForm";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Order } from "@/types";

function Orders() {
  const initialValue = {
    fullName: "",
    city: "",
    country: "",
    region: "",
    streetAddress: "",
    buildingNumber: "",
    floorNumber: "",
    apartmentNumber: "",
    phoneNumber: "",
    notes: "",
  };

  const { data, error, loading } = useFetchAll<Order[]>(
    API_ENDPOINTS.orders.getAll
  );

  if (loading) return <Loading size="xl" />;

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <Error title="Orders" message={message} />;
  }

  return (
    <DashboardSection
      title="Orders"
      buttonLabel="Add Order"
      description="Add a new order"
      initialFormValue={initialValue}
      onSubmit={() => {}}
      formComponent={(props) => <AddOrderForm {...props} />}
    >
      <List>
        {data?.map((order) => (
          <ListItem key={order.id}>
            <div className="">{order.fullName}</div>
          </ListItem>
        ))}
      </List>
    </DashboardSection>
  );
}

export default Orders;
