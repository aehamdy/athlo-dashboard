import { API_ENDPOINTS } from "@/api/endPoints";
import BrandCard from "@/components/BrandCard";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Loading from "@/components/sharedComponents/Loading";
import Error from "@/components/sharedComponents/Error";
import useFetchAll from "@/hooks/useFetchAll";
import type { Brand } from "@/types";
import AddBrandForm from "@/components/AddBrandForm";

function Brands() {
  const { data, error, loading } = useFetchAll<Brand[]>(
    API_ENDPOINTS.brands.getAll
  );

  if (loading) {
    return <Loading size="xl" />;
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <Error title="Brands" message={errorMessage} />;
  }

  return (
    <DashboardSection
      title="Brands"
      buttonLabel="Add Brand"
      onButtonClick={() => {}}
      formComponent={<AddBrandForm />}
      description="Add new brands to your collection"
    >
      <List>
        {data?.map((brand: Brand) => (
          <ListItem key={brand.id}>
            <BrandCard brand={brand} />
          </ListItem>
        ))}
      </List>
    </DashboardSection>
  );
}

export default Brands;
