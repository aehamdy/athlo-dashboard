import type { Category } from "@/types";
import Heading from "./sharedComponents/Heading";

function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="flex justify-center items-center h-25 bg-accent/30 overflow-hidden">
      <Heading as="h3" className="text-base font-semibold">
        {category.name}
      </Heading>
    </article>
  );
}

export default CategoryCard;
