import { API_ENDPOINTS } from "@/api/endPoints";
import axios from "axios";
import { useEffect, useState } from "react";
import BrandCard, { type Brand } from "@/components/BrandCard";
import List from "@/components/sharedComponents/List";
import ListItem from "@/components/sharedComponents/ListItem";
import DashboardSection from "@/components/sharedComponents/DashboardSection";
import Loading from "@/components/sharedComponents/Loading";
import Error from "@/components/sharedComponents/Error";

type ApiResponse<T> = {
  data: T;
  succeeded: boolean;
  message?: string;
};

function Brands() {
  const [brands, setBrands] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.get(API_ENDPOINTS.brands.getAll);
        setBrands(response.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "API request failed";
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (isLoading) {
    return <Loading size="xl" />;
  }

  if (errorMessage) {
    return <Error title="Brands" message={errorMessage} />;
  }

  return (
    <DashboardSection
      title="Brands"
      buttonLabel="Add Brand"
      onButtonClick={() => {}}
    >
      <List>
        {brands?.map((brand: Brand) => (
          <ListItem>
            <BrandCard brand={brand} />
          </ListItem>
        ))}
      </List>
    </DashboardSection>
  );
}

export default Brands;
