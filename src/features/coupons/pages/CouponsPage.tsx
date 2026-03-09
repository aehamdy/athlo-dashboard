import { DataTable } from "@/components/data-table/DataTable";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import couponsColumns from "../columns";
import useFetchAllCoupons from "../hooks/useFetchAllCoupons";
import type { Coupon } from "../types";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import useDeleteCoupon from "../hooks/useDeleteCoupon";
import DetailsPanel from "@/components/shared/DetailsPanel";
import CouponDetails from "../components/CouponDetails";
import { Button } from "@/components/ui/button";
import Icon from "@/components/shared/Icon";
import AddCouponForm from "../components/AddCouponForm";

function Coupons() {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);
  const { data: coupons, isLoading, isError } = useFetchAllCoupons();
  const deleteCoupon = useDeleteCoupon();

  const columns = couponsColumns((id) => {
    const coupon = coupons?.find((coupon) => coupon.id === id);
    if (coupon) setCouponToDelete(coupon);
  });

  const handleConfirmDelete = () => {
    if (!couponToDelete) return;

    deleteCoupon.mutate(couponToDelete.id, {
      onSuccess: () => setCouponToDelete(null),
    });
  };

  const handleRowClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsSheetOpen(true);
  };

  return (
    <DashboardPageLayout
      title="Coupons"
      dialogLabel="Add New Coupon"
      description="Fill in the details to create a new coupon"
      action={
        <Button className="flex items-center gap-sm">
          <Icon name="Plus" />
          New Coupon
        </Button>
      }
      formComponent={<AddCouponForm />}
    >
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={coupons ?? []}
          isLoading={isLoading}
          error={isError}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>

      {couponToDelete && (
        <ConfirmDeleteModal
          item={couponToDelete}
          setItem={setCouponToDelete}
          itemLabel="coupon"
          getDisplayName={(coupon) => coupon.code}
          onConfirm={handleConfirmDelete}
          isPending={deleteCoupon.isPending}
        />
      )}

      {selectedCoupon && (
        <DetailsPanel
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          title="Coupon Details"
          description="View and manage coupon details"
          width="min-w-[95%] md:min-w-1/2 lg:min-w-1/4"
        >
          <CouponDetails coupon={selectedCoupon} />
        </DetailsPanel>
      )}
    </DashboardPageLayout>
  );
}

export default Coupons;
