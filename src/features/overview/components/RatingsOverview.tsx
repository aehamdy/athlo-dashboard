import { useOverviewData } from '../hooks/useOverviewData';
import Icon from '@/components/shared/Icon';
import RatingsOverviewSkeleton from './skeletons/RatingsOverviewSkeleton';
import Error from '@/components/shared/Error';

function RatingsOverview() {
  const { ratings, isLoading, isError } = useOverviewData();
  const textColor = '#9D6F34';
  const progressBackground = '#FEF08A';
  const progressFill = '#EAB308';

  if (isLoading) return <RatingsOverviewSkeleton />;
  if (isError)
    return <Error title="Ratings Overview" message="Failed to load ratings" />;

  return (
    <div className="py-xl px-md text-[#9D6F34] bg-[#FEF3C7] border border-[#FBBF24] rounded-md">
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-center">
          <div>Ratings</div>

          <div className="flex items-center gap-xs">
            {ratings.averageRating.toFixed(1)}
            <Icon name="Star" style={{ color: textColor, fill: textColor }} />
          </div>
        </div>

        <ul className="flex flex-col gap-xs">
          {ratings.distribution
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
                      style={{ color: textColor, fill: textColor }}
                      size={12}
                    />
                  </div>

                  <div
                    className={`flex-1 bg-[${progressBackground}] h-2 rounded-md overflow-hidden`}
                    role="progressbar"
                    aria-valuenow={distribution.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full bg-[${progressFill}]`}
                      style={{ width: `${distribution.percentage}%` }}
                    />
                  </div>

                  <div className="w-10 text-right">
                    {distribution.percentage}%
                  </div>
                </li>
              ) : null,
            )}
        </ul>

        <p className="font-medium text-xs">
          Based on {ratings.totalReviews} customer reviews
        </p>
      </div>
    </div>
  );
}

export default RatingsOverview;
