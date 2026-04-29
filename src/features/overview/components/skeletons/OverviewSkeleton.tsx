import KpiCardSkeleton from './KpiCardSkeleton';
import OrderStatusSkeleton from './OrderStatusSkeleton';
import RatingsOverviewSkeleton from './RatingsOverviewSkeleton';
import RecentOfflineListSkeleton from './RecentOfflineListSkeleton';
import RecentOrdersTableSkeleton from './RecentOrdersTableSkeleton';
import RevenueChartSkeleton from './RevenueChartSkeleton';
import TopCitiesListSkeleton from './TopCitiesListSkeleton';
import TopProductsListSkeleton from './TopProductsListSkeleton';

function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-regular md:gap-base">
      <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-base">
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={index} />
        ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-regular md:gap-base">
        <div className="md:h-auto md:col-span-7 lg:col-span-8">
          <RevenueChartSkeleton />
        </div>

        <div className="md:h-auto md:col-span-5 lg:col-span-4">
          <OrderStatusSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-regular md:gap-base">
        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <RatingsOverviewSkeleton />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <RecentOfflineListSkeleton />
        </div>

        <div className="col-span-2 lg:col-span-6">
          <TopCitiesListSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-regular md:gap-base">
        <div className="lg:col-span-8">
          <RecentOrdersTableSkeleton />
        </div>

        <div className="lg:col-span-4">
          <TopProductsListSkeleton />
        </div>
      </div>
    </div>
  );
}

export default OverviewSkeleton;
