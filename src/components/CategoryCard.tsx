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
    <article className="group rounded-xl overflow-hidden">
      <div className="relative before:absolute before:inset-0 before:w-full before:h-full before:bg-linear-to-t from-black to-transparent">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
          alt={category.name}
          className="w-full h-40 md:h-90 object-cover"
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="absolute bottom-0 start-0 end-0 p-4 text-white lg:group-hover:translate-y-[-1rem] lg:transition-transform lg:duration-normal">
            <Heading as="h3" className="font-semibold text-lg text-light">
              {category.name || category.nameEn}
            </Heading>

            <div className="flex justify-between items-center gap-2 mt-2 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-normal">
              <Button
                variant="secondary"
                size="sm"
                onClick={onEdit}
                className="flex-1 text-light hover:text-dark active:text-dark bg-light/30 hover:bg-light/90 active:bg-light/90 border-light/20 cursor-pointer"
              >
                <SquarePen className="w-4 h-4 mr-1" />
                Edit
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="flex-1 text-light bg-red-500/50 hover:bg-red-500 active:bg-red-500 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CategoryCard;
