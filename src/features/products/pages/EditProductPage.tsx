import { Navigate, useParams } from "react-router-dom";
import EditProductLayout from "../components/EditProductLayout";
import type { EditProductTab } from "../types";
import { ROUTE_PATHS } from "@/routes/paths";
import { DEFAULT_EDIT_PRODUCT_TAB, EDIT_PRODUCT_TABS } from "../constants";
import useFetchProductInfo from "../hooks/useFetchProductInfo";
import EditProductInfoTab from "../components/tabs/EditProductInfoTab";
import EditProductMediaTab from "../components/tabs/EditProductMediaTab";
import EditProductVariantsTab from "../components/tabs/EditProductVariantsTab";

function EditProductPage() {
  const { id, tab } = useParams<{
    id: string;
    tab?: EditProductTab;
  }>();

  const { data: product, isLoading } = useFetchProductInfo(Number(id));

  if (!id) {
    return <Navigate to={ROUTE_PATHS.dashboard.products} replace />;
  }

  const currentTab = tab ?? DEFAULT_EDIT_PRODUCT_TAB;

  if (!EDIT_PRODUCT_TABS.some((tab) => tab.key === currentTab)) {
    return (
      <Navigate
        to={ROUTE_PATHS.dashboard.editProduct(id, DEFAULT_EDIT_PRODUCT_TAB)}
        replace
      />
    );
  }

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <EditProductLayout product={product} activeTab={currentTab}>
      {currentTab === "info" && <EditProductInfoTab product={product} />}
      {currentTab === "media" && <EditProductMediaTab product={product} />}
      {currentTab === "variants" && (
        <EditProductVariantsTab product={product} />
      )}
    </EditProductLayout>
  );
}

export default EditProductPage;
