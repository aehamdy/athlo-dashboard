import type { ReactNode } from 'react';

function ProductReviewsList({ children }: { children: ReactNode }) {
  return (
    <ul className="min-h-27.5 max-h-77.5 md:min-h-31.25 md:max-h-97.5 py-sm space-y-sm overflow-y-auto">
      {children}
    </ul>
  );
}

export default ProductReviewsList;
