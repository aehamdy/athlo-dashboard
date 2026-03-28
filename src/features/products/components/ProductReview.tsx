import Heading from '@/components/shared/Heading';
import type { IProductReview } from '../types';
import Icon from '@/components/shared/Icon';
import { formatDateTime } from '@/utils/formatDateTime';

function ProductReview({ review }: { review: IProductReview }) {
  const { date } = formatDateTime(review.createdAt);

  return (
    <article className="overflow-hidden">
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between">
          <Heading as="h6" className="text-sm font-semibold">
            {review.userName}
          </Heading>

          <div className="flex items-center gap-xs text-sm">
            {Array.from({ length: 5 }).map((_, index) => {
              const isFilled = index < review.rating;

              return (
                <Icon
                  key={index}
                  name="Star"
                  className={
                    isFilled ? 'fill-accent text-accent' : 'text-accent'
                  }
                />
              );
            })}
          </div>
        </div>

        <p className="my-sm text-sm text-neutral-muted">{review.comment}</p>

        <p className="text-end text-xs text-neutral-muted">{date}</p>
      </div>
    </article>
  );
}

export default ProductReview;
