import type { ReactNode } from "react";
import EditProductTabs from "./EditProductTabs";
import type { Product } from "@/types";
import Heading from "@/components/shared/Heading";

interface Props {
  product: Product;
  activeTab: string;
  children: ReactNode;
}

function EditProductLayout({ product, activeTab, children }: Props) {
  return (
    <section className="h-full space-y-compact rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-compact bg-light rounded-xl">
        <Heading as="h1" className="text-lg md:text-xl">
          Edit Product <span className="text-accent">{product.name}</span>
        </Heading>
      </div>

      <div className="h-full space-y-compact p-compact bg-light rounded-xl overflow-hidden">
        <EditProductTabs
          productId={product.id.toString()}
          activeTab={activeTab}
        />

        <div className="h-full p-md bg-background rounded-xl">{children}</div>
      </div>
    </section>
  );
}

export default EditProductLayout;
