import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { EDIT_PRODUCT_TABS } from "../constants";

interface Props {
  productId: string;
  activeTab: string;
}

function EditProductTabs({ productId, activeTab }: Props) {
  return (
    <div className="flex gap-6 border-b">
      {EDIT_PRODUCT_TABS.map((tab) => (
        <Link
          key={tab.key}
          to={ROUTE_PATHS.dashboard.editProduct(productId, tab.key)}
          className={`pb-sm font-medium text-sm capitalize transition ${
            activeTab === tab.key
              ? "border-b-2 border-accent text-accent"
              : "text-neutral-muted/60 hover:text-foreground"
          } focus-visible:outline-accent`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default EditProductTabs;
