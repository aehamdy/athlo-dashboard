import { API_ENDPOINTS } from "@/api/endPoints";
import AddOrderForm, {
  type AddOrderFormData,
} from "@/components/forms/AddOrderForm";
import OrdersTable from "@/components/OrdersTable";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Order } from "@/types";
import { useState } from "react";

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

function Orders() {
  const [formData, setFormData] = useState<AddOrderFormData>(initialValue);

  const { data, error, loading } = useFetchAll<Order[]>(
    API_ENDPOINTS.orders.getAll,
  );

  if (loading) return <Loading variant="table" />;

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <Error title="Orders" message={message} />;
  }

  return (
    <DashboardSection
      title="Orders"
      buttonLabel="Add Order"
      description="Add a new order"
      formComponent={<AddOrderForm value={formData} onChange={setFormData} />}
    >
      <List variant="table">{data && <OrdersTable data={data} />}</List>
    </DashboardSection>
  );
}

export default Orders;
