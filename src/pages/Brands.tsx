import { API_ENDPOINTS } from "@/api/endPoints";
import BrandCard from "@/features/brands/components/BrandCard";
import List from "@/components/shared/List";
import ListItem from "@/components/shared/ListItem";
import DashboardSection from "@/components/shared/DashboardSection";
import Loading from "@/components/shared/Loading";
import type { Brand } from "@/types";
import { useState } from "react";
import http from "@/api/http";
import BrandForm from "@/features/brands/components/BrandForm";
import useBrands from "@/features/brands/api/useBrands";
import ConfirmDeleteModal from "@/features/products/components/ConfirmDeleteModal";
import { toast } from "sonner";
import type { AxiosError } from "axios";

function Brands() {
  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null);

  const handleDelete = async (brand: Brand) => {
    if (!brand) return;

    try {
      await http.delete(API_ENDPOINTS.brands.delete(brand.id));

      setDeletingBrand(null);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;

      const message =
        axiosError.response?.data?.message ||
        "Something went wrong while deleting.";

      toast.error(message, {
        closeButton: true,
      });
    }
  };

  const handleCancelDelete = () => {
    setDeletingBrand(null);
  };

  if (brandsLoading) return <Loading size="xl" />;

  return (
    <DashboardSection
      title="Brands"
      buttonLabel="Add Brand"
      description="Add new brands to your collection"
      formComponent={<BrandForm />}
    >
      <List>
        {brands?.map((brand) => (
          <ListItem key={brand.id}>
            <BrandCard
              brand={brand}
              onEdit={() => setEditingBrand(brand)}
              onDelete={() => setDeletingBrand(brand)}
            />
          </ListItem>
        ))}
      </List>

      {/* Edit Form */}
      {editingBrand && (
        <BrandForm
          mode="edit"
          brand={editingBrand}
          onSuccess={() => setEditingBrand(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        item={deletingBrand}
        setItem={setDeletingBrand}
        itemLabel="brand"
        getDisplayName={(brand) => brand?.name || ""}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />
    </DashboardSection>
  );
}

export default Brands;
