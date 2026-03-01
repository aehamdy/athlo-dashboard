import type { ReactNode } from "react";
import EditProductTabs from "./EditProductTabs";
import Heading from "@/components/shared/Heading";
import type { Product } from "../types";

interface Props {
  product: Product;
  activeTab: string;
  children: ReactNode;
}

function EditProductLayout({ product, activeTab, children }: Props) {
  return (
    <section className="flex flex-col h-full rounded-xl overflow-hidden">
      <div className="p-compact bg-light rounded-xl">
        <Heading as="h1" className="text-lg md:text-xl">
          Edit Product{" "}
          <span className="text-accent">
            {product.name || product.nameEn || ""}
          </span>
        </Heading>
      </div>

      <div className="flex flex-col flex-1 min-h-0 p-compact bg-light rounded-xl">
        <EditProductTabs product={product} activeTab={activeTab} />

        <div className="flex-1 min-h-0 mt-sm bg-background rounded-xl">
          {children}
        </div>
      </div>
    </section>
  );
}

export default EditProductLayout;
