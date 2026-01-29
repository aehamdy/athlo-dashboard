import { API_ENDPOINTS } from "@/api/endPoints";
import AddProductForm from "@/components/forms/AddProductForm";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Product } from "@/types";

function Products() {
  const { data, error, loading } = useFetchAll<Product[]>(
    API_ENDPOINTS.products.getAll,
  );

  if (loading) return <Loading size="xl" />;

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <Error title="Products" message={errorMessage} />;
  }

  return (
    <DashboardSection
      title="Products"
      buttonLabel="Add Product"
      description="Add new products to your collection"
      formComponent={<AddProductForm />}
    >
      <List>
        {data?.map((product) => (
          <ListItem key={product.id}>
            <div className="">{product.name}</div>
          </ListItem>
        ))}
      </List>
    </DashboardSection>
  );
}

export default Products;
