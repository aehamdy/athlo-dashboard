import { API_ENDPOINTS } from "@/api/endPoints";
import BrandCard from "@/components/BrandCard";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Loading from "@/components/sharedComponents/Loading";
import Error from "@/components/sharedComponents/Error";
import useFetchAll from "@/hooks/useFetchAll";
import type { Brand } from "@/types";
import AddBrandForm from "@/components/forms/AddBrandForm";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import http from "@/api/http";

function Brands() {
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null);
  const { data, error, loading } = useFetchAll<Brand[]>(
    API_ENDPOINTS.brands.getAll,
  );

  const handleDelete = async () => {
    if (!deletingBrand) return;

    try {
      await http.delete(
        API_ENDPOINTS.brands.delete(deletingBrand.id.toString()),
      );
      console.log(`Brand ${deletingBrand?.id} deleted`);
      setDeletingBrand(null);
      // optionally trigger refetch or optimistic update
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingBrand(null);
  };

  if (loading) return <Loading size="xl" />;

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <Error title="Brands" message={message} />;
  }

  return (
    <DashboardSection
      title="Brands"
      buttonLabel="Add Brand"
      description="Add new brands to your collection"
      formComponent={<AddBrandForm />}
    >
      <List>
        {data?.map((brand) => (
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
              {editingBrand ? "Edit Brand" : deletingBrand && "Delete Brand"}
            </DialogTitle>
          </DialogHeader>

          {/* Display Delete Description */}
          {deletingBrand && (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deletingBrand?.nameEn}</span>{" "}
              category?
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
