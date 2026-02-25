import { useState } from "react";
import { toast } from "sonner";
import type { Category } from "../types";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/features/categories/hooks/useCategories";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import CategoriesGrid from "@/features/categories/components/CategoriesGrid";
import CategoryForm from "@/features/categories/components/CategoryForm";
import ConfirmDeleteModal from "@/components/shared/ConfirmDeleteModal";
import Icon from "@/components/shared/Icon";

function Categories() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const {
    data: categories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const handleEdit = (id: number) => {
    const category = categories?.find((cat) => cat.id === id);
    if (category) {
      setSelectedCategory(category);
      setOpenForm(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    const category = categories?.find((cat) => cat.id === id);
    if (category) setCategoryToDelete(category);
  };

  const handleConfirmDelete = (category: Category) => {
    deleteCategory.mutate(category.id, {
      onSuccess: () => {
        toast.success(`"Category ${category.name}" deleted successfully!`);
        setCategoryToDelete(null);
      },
      onError: () => {
        toast.error("Failed to delete category. Please try again.");
      },
    });
  };

  const handleCancelDelete = () => setCategoryToDelete(null);

  return (
    <>
      <DashboardPageLayout
        open={openForm}
        onOpenChange={setOpenForm}
        title="Categories"
        dialogLabel="Add Category"
        description="Add new categories to your collection"
        action={
          <Button className="flex items-center gap-sm">
            <Icon name="Plus" /> Add Category
          </Button>
        }
        formComponent={
          <CategoryForm
            category={selectedCategory}
            createCategory={createCategory}
            updateCategory={updateCategory}
            onSuccess={() => {
              setOpenForm(false);
              setSelectedCategory(null);
            }}
          />
        }
      >
        <CategoriesGrid
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          categories={categories ?? []}
          isLoading={false}
        />
      </DashboardPageLayout>

      {/* Delete confirmation modal */}
      <ConfirmDeleteModal<string>
        item={categoryToDelete?.name ?? null}
        setItem={() => setCategoryToDelete(null)}
        itemLabel="category"
        getDisplayName={(name) => name}
        onConfirm={() =>
          categoryToDelete && handleConfirmDelete(categoryToDelete)
        }
        onCancel={handleCancelDelete}
        isPending={deleteCategory.status === "pending"}
      />
    </>
  );
}

export default Categories;
