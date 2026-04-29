import Icon from '@/components/shared/Icon';
import type { RatingsOverviewType } from '../types';

type RatingsOverviewProps = {
  ratings: RatingsOverviewType;
};

function RatingsOverview({ ratings }: RatingsOverviewProps) {
  return (
    <div className="h-full space-y-sm py-xl px-md text-warning-text bg-warning-bg-soft border border-warning-border rounded-md">
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Ratings</div>

          <div className="flex items-center gap-xs">
            {ratings?.averageRating.toFixed(1)}

            <Icon name="Star" className="text-warning-text fill-warning-text" />
          </div>
        </div>

        <ul className="flex flex-col gap-lg">
          {ratings?.distribution
            ?.slice()
            .reverse()
            .map((distribution: any) =>
              distribution.percentage > 0 ? (
                <li
                  key={distribution.stars}
                  className="flex items-center gap-xs"
                >
                  <div className="flex items-center gap-xs w-10">
                    {distribution.stars}

                    <Icon
                      name="Star"
                      className="text-warning-text fill-warning-text"
                      size={12}
                    />
                  </div>

                  <div
                    className={`flex-1 h-2 bg-warning-bg rounded-md overflow-hidden`}
                    role="progressbar"
                    aria-valuenow={distribution.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full bg-warning-fill`}
                      style={{
                        width: `${distribution.percentage}%`,
                      }}
                    />
                  </div>

                  <div className="w-10 text-right">
                    {distribution.percentage}%
                  </div>
                </li>
              ) : null,
            )}
        </ul>

        <p className="mt-md font-medium text-xs">
          Based on {ratings?.totalReviews} customer reviews
        </p>
      </div>
    </div>
  );
}

export default RatingsOverview;
