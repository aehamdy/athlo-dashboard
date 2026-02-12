import AddCouponForm from "@/features/coupons/components/AddCouponForm";
import DashboardSection from "@/components/shared/DashboardSection";
import List from "@/components/shared/List";
import TableWrapper from "@/components/shared/TableWrapper";
import CouponsTable from "@/features/coupons/components/CouponsTable";

function Coupons() {
  return (
    <DashboardSection
      title="Coupons"
      buttonLabel="Add Coupon"
      description="Create, manage, and track discount coupons for your store."
      formComponent={<AddCouponForm />}
    >
      <List variant="table">
        <TableWrapper>
          <CouponsTable />
        </TableWrapper>
      </List>
    </DashboardSection>
  );
}

export default Coupons;
