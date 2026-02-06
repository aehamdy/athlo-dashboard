import { useState } from "react";
import { API_ENDPOINTS } from "@/api/endPoints";
import CategoryForm from "@/components/forms/CategoryForm";
import CategoryCard from "@/components/CategoryCard";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Category } from "@/types";
import { Button } from "@/components/ui/button";
import http from "@/api/http";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Categories() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  const { data, error, loading } = useFetchAll<Category[]>(
    API_ENDPOINTS.categories.getAll,
  );

  const handleDelete = async () => {
    if (!deletingCategory) return;

    try {
      await http.delete(API_ENDPOINTS.categories.delete(deletingCategory.id));

      setDeletingCategory(null);

      // optionally trigger refetch or optimistic update
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingCategory(null);
  };

  if (loading) return <Loading size="xl" />;

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <Error title="Categories" message={errorMessage} />;
  }

  return (
    <DashboardSection
      title="Categories"
      buttonLabel="Add Category"
      description="Add new categories to organize your products"
      formComponent={<CategoryForm />}
    >
      <List>
        {data?.map((category) => (
          <ListItem key={category.id}>
            <CategoryCard
              category={category}
              onEdit={() => setEditingCategory(category)}
              onDelete={() => setDeletingCategory(category)}
            />
          </ListItem>
        ))}
      </List>

      {/* Edit and Delete Dialog */}
      <Dialog
        open={!!editingCategory || !!deletingCategory}
        onOpenChange={(open) =>
          (!open && setEditingCategory(null)) ||
          (!open && setDeletingCategory(null))
        }
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit " : deletingCategory ? "Delete " : ""}
              <span className="text-accent-strong">
                {editingCategory?.name}
              </span>{" "}
              Category
            </DialogTitle>
          </DialogHeader>

          {/* Display Delete Description */}
          {deletingCategory && (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-accent-strong">
                {deletingCategory?.name || deletingCategory?.nameEn}
              </span>{" "}
              category?
            </DialogDescription>
          )}

          {/* Display Edit Form */}
          {editingCategory && (
            <CategoryForm
              mode="edit"
              category={editingCategory}
              onSuccess={() => setEditingCategory(null)}
            />
          )}

          {/* Display Delete Message */}
          {deletingCategory && (
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

export default Categories;
