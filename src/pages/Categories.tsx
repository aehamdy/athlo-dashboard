import { useState } from "react";
import { API_ENDPOINTS } from "@/api/endPoints";
import CategoryForm from "@/features/categories/components/CategoryForm";
import DashboardSection from "@/components/shared/DashboardSection";
import List from "@/components/shared/List";
import ListItem from "@/components/shared/ListItem";
import Loading from "@/components/shared/Loading";
import type { Category } from "@/types";
import http from "@/api/http";
import CategoryCard from "@/features/categories/components/CategoryCard";
import { useCategories } from "@/features/categories/api/useCategories";
import ConfirmDeleteModal from "@/features/products/components/ConfirmDeleteModal";

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

      {/* Edit Form */}
      {editingCategory && (
        <CategoryForm
          mode="edit"
          category={editingCategory}
          onSuccess={() => setEditingCategory(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        item={deletingCategory}
        setItem={setDeletingCategory}
        itemLabel="category"
        getDisplayName={(category) => category?.name || ""}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />
    </DashboardSection>
  );
}

export default Categories;
