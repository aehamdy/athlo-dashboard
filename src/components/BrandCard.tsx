import type { Brand } from "@/types";
import Heading from "./sharedComponents/Heading";

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="flex justify-center items-center h-25 bg-accent/30 overflow-hidden">
      <Heading as="h3" className="text-base font-semibold">
        {brand.name}
      </Heading>
    </article>
  );
}

export default BrandCard;
