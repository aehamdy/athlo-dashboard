import { API_ENDPOINTS } from "@/api/endPoints";
import BrandCard from "@/features/brands/components/BrandCard";
import List from "@/components/shared/List";
import ListItem from "@/components/shared/ListItem";
import DashboardSection from "@/components/shared/DashboardSection";
import Loading from "@/components/shared/Loading";
import type { Brand } from "@/types";
import AddBrandForm from "@/features/brands/components/BrandForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import http from "@/api/http";
import BrandForm from "@/features/brands/components/BrandForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useBrands from "@/features/brands/api/useBrands";

function Brands() {
  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null);

  const handleDelete = async () => {
    if (!deletingBrand) return;

    try {
      await http.delete(
        API_ENDPOINTS.brands.delete(deletingBrand.id.toString()),
      );
      console.log(`Brand ${deletingBrand?.id} deleted`);
      setDeletingBrand(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingBrand(null);
  };

  if (brandsLoading) return <Loading size="xl" />;

  // if (error) {
  //   const message = error instanceof Error ? error.message : String(error);
  //   return <Error title="Brands" message={message} />;
  // }

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

      {/* Edit and Delete Dialog */}
      <Dialog
        open={!!editingBrand || !!deletingBrand}
        onOpenChange={(open) =>
          (!open && setEditingBrand(null)) || (!open && setDeletingBrand(null))
        }
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {editingBrand ? "Edit " : deletingBrand ? "Delete " : ""}
              <span className="text-accent-strong">
                {editingBrand?.name}
              </span>{" "}
              Brand
            </DialogTitle>
          </DialogHeader>

          {/* Display Delete Description */}
          {deletingBrand && (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-accent-strong">
                {deletingBrand?.name || deletingBrand?.nameEn}
              </span>{" "}
              brand?
            </DialogDescription>
          )}

          {/* Display Edit Form */}
          {editingBrand && (
            <AddBrandForm
              mode="edit"
              brand={editingBrand}
              onSuccess={() => setEditingBrand(null)}
            />
          )}

          {/* Display Delete Button */}
          {deletingBrand && (
            <div className="flex justify-between items-center">
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="cursor-pointer"
              >
                Yes
              </Button>

              <Button
                variant="outline"
                onClick={handleCancelDelete}
                className="cursor-pointer"
              >
                No
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardSection>
  );
}

export default Brands;
