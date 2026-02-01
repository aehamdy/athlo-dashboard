import CouponsTable from "@/components/CouponsTable";
import AddCouponForm from "@/components/forms/AddCouponForm";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import List from "@/components/sharedComponents/List";

function Coupons() {
  return (
    <DashboardSection
      title="Coupons"
      buttonLabel="Add Coupon"
      description="Create, manage, and track discount coupons for your store."
      formComponent={<AddCouponForm />}
    >
      <List variant="table">
        <CouponsTable />
      </List>
    </DashboardSection>
  );
}

export default Coupons;
