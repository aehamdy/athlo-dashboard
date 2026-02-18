import { useState } from "react";
import type { Category } from "../types";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/features/categories/hooks/useCategories";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import CategoriesGrid from "@/features/categories/components/CategoriesGrid";
import CategoryForm from "@/features/categories/components/CategoryForm";

function Categories() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const { data: categories, createCategory, updateCategory } = useCategories();

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

  return (
    <>
      <DashboardPageLayout
        open={openForm}
        onOpenChange={setOpenForm}
        title="Categories"
        dialogLabel="Add Category"
        description="Add new categories to your collection"
        action={<Button>Add Category</Button>}
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
          onDelete={handleDeleteClick} // opens modal
          categories={categories ?? []}
          isLoading={false}
        />
      </DashboardPageLayout>
    </>
  );
}

export default Categories;
