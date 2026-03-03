import Heading from "@/components/shared/Heading";
import type { Product } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductDetailsProps = {
  product: Product;
};

function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="">
      <div className="py-base px-regular border-b">
        <Heading as="h3" className="text-lg font-semibold">
          Product Details
        </Heading>
      </div>

      <section className="h-full">
        <section className="p-base border-b">
          <div className="">
            <Heading as="h5" className="text-base font-semibold">
              Images
            </Heading>
          </div>

          <div className=""></div>
        </section>

        <section className="p-base border-b">
          <div className="">
            <Heading as="h5" className="text-base font-semibold">
              Info
            </Heading>

            {product.name}
          </div>

          <div className=""></div>
        </section>

        <section className="px-base border-b">
          <Accordion type="single" collapsible defaultValue="variants">
            <AccordionItem value="variants">
              <AccordionTrigger className="">
                <Heading as="h5" className="text-base font-semibold">
                  Variants
                </Heading>
              </AccordionTrigger>

              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight
                shipping. Free shipping on international orders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="px-base border-b">
          <Accordion type="single" collapsible>
            <AccordionItem value="reviews">
              <AccordionTrigger className="">
                <Heading as="h5" className="text-base font-semibold">
                  Reviews
                </Heading>
              </AccordionTrigger>

              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight
                shipping. Free shipping on international orders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </section>
    </section>
  );
}

export default ProductDetails;
