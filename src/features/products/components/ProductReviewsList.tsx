import type { ReactNode } from 'react';

function ProductReviewsList({ children }: { children: ReactNode }) {
  return (
    <ul className="h-[410px] md:h-[450px] lg:max-h-[350px] py-sm space-y-sm overflow-y-auto">
      {children}
    </ul>
  );
}

export default ProductReviewsList;
