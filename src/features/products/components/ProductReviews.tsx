import Heading from '@/components/shared/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductReviewsList from './ProductReviewsList';
import ReviewSkeleton from './skeletons/skeleton-components/ReviewSkeleton';
import ProductReview from './ProductReview';
import { useState } from 'react';
import useFetchProductRevviews from '../hooks/useFetchProductReviews';
import Icon from '@/components/shared/Icon';

function ProductReviews({ productId }: { productId: number }) {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const { data: reviews, isLoading: isLoadingReviews } =
    useFetchProductRevviews(productId, { enabled: isReviewsOpen });

  const hasReviews = reviews && reviews.length > 0;

  return (
    <section className="px-base border-b">
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => {
          setIsReviewsOpen(value === 'reviews');
        }}
      >
        <AccordionItem value="reviews">
          <AccordionTrigger className="hover:no-underline cursor-pointer">
            <Heading as="h5" className="text-base font-semibold">
              Reviews
            </Heading>
          </AccordionTrigger>

          <AccordionContent>
            {isLoadingReviews ? (
              <ReviewSkeleton />
            ) : (
              <ProductReviewsList>
                {hasReviews ? (
                  reviews.map((review) => {
                    return (
                      <li
                        key={review.id}
                        className="flex flex-col gap-sm p-sm border rounded-md"
                      >
                        <ProductReview review={review} />
                      </li>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center gap-sm">
                    <Icon name="AlertCircle" className="text-neutral-muted" />

                    <p className="text-neutral-muted">No reviews added yet.</p>
                  </div>
                )}
              </ProductReviewsList>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default ProductReviews;
