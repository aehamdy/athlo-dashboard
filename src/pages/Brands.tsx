import { API_ENDPOINTS } from "@/api/endPoints";
import BrandCard from "@/components/BrandCard";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Loading from "@/components/sharedComponents/Loading";
import Error from "@/components/sharedComponents/Error";
import useFetchAll from "@/hooks/useFetchAll";
import type { Brand } from "@/types";
import AddBrandForm, { type AddBrandFormData } from "@/components/AddBrandForm";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH } from "@/constants/auth";

function Brands() {
  const { data, error, loading } = useFetchAll<Brand[]>(
    API_ENDPOINTS.brands.getAll
  );

  const addNewBrand = async (formData: AddBrandFormData) => {
    console.log(formData);

    await axios.post(
      API_ENDPOINTS.brands.create,
      {
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get(AUTH.COOKIE.ACCESS_TOKEN)}`,
        },
      }
    );
  };

  if (loading) return <Loading size="xl" />;

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <Error title="Brands" message={message} />;
  }

  return (
    <DashboardSection<AddBrandFormData>
      title="Brands"
      buttonLabel="Add Brand"
      description="Add new brands to your collection"
      initialFormValue={{ nameEn: "", nameAr: "" }}
      onSubmit={addNewBrand}
      formComponent={(props) => <AddBrandForm {...props} />}
    >
      <List>
        {data?.map((brand) => (
          <ListItem key={brand.id}>
            <BrandCard brand={brand} />
          </ListItem>
        ))}
      </List>
    </DashboardSection>
  );
}

export default Brands;
