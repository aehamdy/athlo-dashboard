import { API_ENDPOINTS } from "@/api/endPoints";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import CategoryCard from "@/components/CategoryCard";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Category } from "@/types";

function Categories() {
  const { data, error, loading } = useFetchAll<Category[]>(
    API_ENDPOINTS.categories.getAll,
  );

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
      formComponent={<AddCategoryForm />}
    >
      <List>
        {data?.map((category) => (
          <ListItem key={category.id}>
            <CategoryCard category={category} />
          </ListItem>
        ))}
      </List>
    </DashboardSection>
  );
}

export default Categories;
