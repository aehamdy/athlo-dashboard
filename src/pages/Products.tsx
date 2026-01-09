import { API_ENDPOINTS } from "@/api/endPoints";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Error from "@/components/sharedComponents/Error";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import Loading from "@/components/sharedComponents/Loading";
import useFetchAll from "@/hooks/useFetchAll";
import type { Product } from "@/types";

function Products() {
  const { data, error, loading } = useFetchAll<Product[]>(
    API_ENDPOINTS.products.getAll
  );

  if (loading) return <Loading size="xl" />;

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <Error title="Products" message={message} />;
  }

  return (
    <DashboardSection<{ nameEn: string; nameAr: string }>
      title="Products"
      buttonLabel="Add Product"
      description="Add new products to your collection"
      initialFormValue={{ nameEn: "", nameAr: "" }}
      onSubmit={() => {}}
      formComponent={(props) => <div>{JSON.stringify(props)}</div>}
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
