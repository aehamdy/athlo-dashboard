import { Button } from "../ui/button";
import AppImage from "./AppImage";
import Heading from "./Heading";
import Icon from "./Icon";

type Entity = {
  id: number;
  imageUrl: string;
  name?: string;
  nameEn?: string;
  nameAr?: string;
};

type Props = {
  entity: Entity;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

function EntityCard({ entity, onEdit, onDelete }: Props) {
  const { id, imageUrl, name, nameEn } = entity;
  const displayName = name || nameEn;

  return (
    <article className="group h-70 lg:h-90 rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <AppImage
          src={imageUrl}
          alt={`${displayName} image`}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute w-full h-full start-0 top-0 bottom-0 p-compact bg-black/50">
          <div className="absolute w-full bottom-0 start-0 end-0 p-base text-light lg:group-hover:translate-y-[-1rem] lg:transition-transform lg:duration-normal">
            <Heading as="h3" className="font-semibold text-lg text-light">
              {displayName}
            </Heading>

            <div className="flex justify-between items-center gap-2 mt-2 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-normal">
              <Button
                variant="ghost"
                onClick={() => onEdit(id)}
                className="flex-1"
              >
                <Icon name="SquarePen" />
                Edit
              </Button>

              <Button
                variant="destructive"
                className="group/button flex-1"
                onClick={() => onDelete(id)}
              >
                <Icon name="Trash2" className="text-light" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EntityCard;
