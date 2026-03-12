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
import CouponForm from "../components/CouponForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useFetchCoupon from "../hooks/useFetchCoupon";
import Loading from "@/components/shared/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { couponKeys } from "../couponKeys";
import { couponsService } from "../services/couponsService";
import DataTableToolbar from "@/components/data-table/DataTableToolbar";
import type { PaginationState } from "@tanstack/react-table";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/ui";

function CouponsPage() {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE_OPTIONS[1],
  });

  const queryClient = useQueryClient();

  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const [editingCouponId, setEditingCouponId] = useState<number | null>(null);

  const { data: coupons, isLoading, isError } = useFetchAllCoupons();

  const { data: couponDetails, isLoading: isCouponLoading } =
    useFetchCoupon(editingCouponId);
  const deleteCoupon = useDeleteCoupon();

  const columns = couponsColumns(
    // delete
    (id) => {
      const coupon = coupons?.find((c) => c.id === id);
      if (coupon) setCouponToDelete(coupon);
    },

    // edit
    (id) => {
      if (id) {
        setEditingCouponId(id);
      }
    },
  );

  const handleConfirmDelete = () => {
    if (!couponToDelete) return;

    deleteCoupon.mutate(couponToDelete.id, {
      onSuccess: () => setCouponToDelete(null),
    });
  };

  const handleRowClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDetailsOpen(true);

    if (coupon.type === "ProductSpecific") {
      queryClient.prefetchQuery({
        queryKey: couponKeys.applicableProducts(coupon.id),
        queryFn: () =>
          couponsService.getApplicableProducts({ discountId: coupon.id }),
        staleTime: 1000 * 60 * 5,
      });
    }
  };

  const handleSearchChange = (value: string) => {
    const cleaned = value.trim();

    setSearch(cleaned);

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  return (
    <DashboardPageLayout
      title="Coupons"
      dialogLabel="Add New Coupon"
      description="Fill in the details to create a new coupon"
      open={isCreateOpen}
      onOpenChange={setIsCreateOpen}
      action={
        <Button className="flex items-center gap-sm">
          <Icon name="Plus" />
          New Coupon
        </Button>
      }
      formComponent={
        <CouponForm
          mode="create"
          onSuccess={() => {
            setIsCreateOpen(false);
          }}
        />
      }
    >
      <div className="flex flex-col gap-xs h-full">
        <div className="md:w-1/4">
          <DataTableToolbar
            search={search}
            onSearchChange={handleSearchChange}
            placeholder="Search coupons..."
          />
        </div>

        <DataTable
          data={coupons ?? []}
          isLoading={isLoading}
          error={isError}
          columns={columns}
          onRowClick={handleRowClick}
          globalFilter={search}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
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
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          title="Coupon Details"
          description="View and manage coupon details"
          width="min-w-[95%] md:min-w-1/2 lg:min-w-1/3"
        >
          <CouponDetails coupon={selectedCoupon} />
        </DetailsPanel>
      )}

      {editingCouponId && (
        <Dialog
          open={!!editingCouponId}
          onOpenChange={(open) => {
            if (!open) setEditingCouponId(null);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Coupon</DialogTitle>
              <DialogDescription className="text-xs">
                Edit and update{" "}
                <span className="font-semibold text-accent">
                  {couponDetails?.nameEn ?? couponDetails?.name}
                </span>{" "}
                coupon
              </DialogDescription>
            </DialogHeader>

            {isCouponLoading ? (
              <div className="flex justify-center py-6">
                <Loading />
              </div>
            ) : (
              <CouponForm
                mode="edit"
                coupon={couponDetails}
                onSuccess={() => {
                  setEditingCouponId(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </DashboardPageLayout>
  );
}

export default CouponsPage;
