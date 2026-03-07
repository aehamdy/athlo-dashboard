import { DataTable } from "@/components/data-table/DataTable";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import couponsColumns from "../columns";
import useFetchAllCoupons from "../hooks/useFetchAllCoupons";
import type { Coupon } from "../types";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import useDeleteCoupon from "../hooks/useDeleteCoupon";

function Coupons() {
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

  return (
    <DashboardPageLayout
      title="Coupons"
      description="Create, manage, and track discount coupons for your store."
    >
      <div className="flex flex-col gap-base h-full">
        <DataTable
          data={coupons ?? []}
          isLoading={isLoading}
          error={isError}
          columns={columns}
        />
      </div>

      {couponToDelete && (
        <ConfirmDeleteModal
          item={couponToDelete}
          setItem={setCouponToDelete}
          itemLabel="coupon"
          getDisplayName={(coupon) => coupon.code}
          onConfirm={handleConfirmDelete}
        />
      )}
    </DashboardPageLayout>
  );
}

export default Coupons;
