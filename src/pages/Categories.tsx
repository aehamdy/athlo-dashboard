import { useState } from "react";
import { API_ENDPOINTS } from "@/api/endPoints";
import CategoryForm from "@/features/categories/components/CategoryForm";
import DashboardSection from "@/components/shared/DashboardSection";
import List from "@/components/shared/List";
import ListItem from "@/components/shared/ListItem";
import Loading from "@/components/shared/Loading";
import type { Category } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import http from "@/api/http";
import CategoryCard from "@/features/categories/components/CategoryCard";
import { useCategories } from "@/features/categories/api/useCategories";

function Categories() {
  const { data: catgories = [], isLoading: categoriesLoading } =
    useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  const handleDelete = async () => {
    if (!deletingCategory) return;

    try {
      await http.delete(API_ENDPOINTS.categories.delete(deletingCategory.id));

      setDeletingCategory(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingCategory(null);
  };

  if (categoriesLoading) return <Loading size="xl" />;

  // if (error) {
  //   const errorMessage = error instanceof Error ? error.message : String(error);

  //   return <Error title="Categories" message={errorMessage} />;
  // }

  return (
    <DashboardSection
      title="Categories"
      buttonLabel="Add Category"
      description="Add new categories to organize your products"
      formComponent={<CategoryForm />}
    >
      <List>
        {catgories?.map((category) => (
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
              {`${editingCategory ? "Edit " : deletingCategory && "Delete "} ${(
                <span className="text-accent-strong">
                  {editingCategory?.name || deletingCategory?.name}
                </span>
              )} Category`}

              {/* {editingCategory

                ? "Edit "

                : deletingCategory &&

                  "Delete " +

                    `${editingCategory?.name || editingCategory?.nameEn} Category`} */}

              {/* {editingCategory ? (

                <p className="">

                  Edit{" "}

                  <span className="text-accent-strong">

                    {editingCategory.name || editingCategory.nameEn}

                  </span>{" "}

                  Category

                </p>

              ) : (

                deletingCategory && "Delete Category"

              )} */}
            </DialogTitle>
          </DialogHeader>

          {/* Display Delete Description */}

          {deletingCategory && (
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
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

          {/* Display Delete Button */}

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
