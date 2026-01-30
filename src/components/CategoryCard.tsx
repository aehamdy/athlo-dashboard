import type { Category } from "@/types";
import Heading from "./sharedComponents/Heading";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";

type CategoryCardProps = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
};

function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <article className="group relative flex justify-center items-center h-25 bg-accent/30 overflow-hidden">
      <Heading as="h3" className="text-base font-semibold">
        {category.name}
      </Heading>

      <div className="absolute bottom-0 -end-full group-hover:end-0 flex flex-col justify-between items-center gap-sm h-full bg-white/50 rounded-sm shadow-xl transition-all duration-normal">
        <Button
          variant="plain"
          onClick={onEdit}
          className="hover:text-blue-500"
        >
          <SquarePen />
        </Button>

        <Button
          variant="plain"
          onClick={onDelete}
          className="hover:text-red-500"
        >
          <Trash2 />
        </Button>
      </div>
    </article>
  );
}

export default CategoryCard;
