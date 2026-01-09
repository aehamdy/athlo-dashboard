import { API_ENDPOINTS } from "@/api/endPoints";
import AddCategoryForm, {
  type AddCategoryFormData,
} from "@/components/AddCategoryForm";
import CategoryCard from "@/components/CategoryCard";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Category } from "@/types";
import axios from "axios";

function Categories() {
  const { data, error, loading } = useFetchAll<Category[]>(
    API_ENDPOINTS.categories.getAll
  );

  const addNewCategory = async (formData: AddCategoryFormData) => {
    await axios.post(API_ENDPOINTS.categories.create, {
      name: formData.name,
    });
  };

  if (loading) return <Loading size="xl" />;

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <Error title="Categories" message={errorMessage} />;
  }

  return (
    <DashboardSection<AddCategoryFormData>
      title="Categories"
      buttonLabel="Add Category"
      description="Add new categories to organize your products"
      initialFormValue={{ name: "" }}
      onSubmit={addNewCategory}
      formComponent={(props) => <AddCategoryForm {...props} />}
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
