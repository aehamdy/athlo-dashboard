import { lazy, Suspense } from 'react';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';
const RevenueChart = lazy(() => import('../components/RevenueChart'));
import OrderStatusChart from '../components/OrderStatusChart';
import RecentOfflineSalesList from '../components/RecentOfflineSalesList';
const TopProductsList = lazy(() => import('../components/TopProductsList'));
const RecentOrdersTable = lazy(() => import('../components/RecentOrdersTable'));
import TopCitiesList from '../components/TopCitiesList';
import { useOverviewData } from '../hooks/useOverviewData';
import Error from '@/components/shared/Error';
import OverviewSkeleton from '../components/skeletons/OverviewSkeleton';
import RevenueChartSkeleton from '../components/skeletons/RevenueChartSkeleton';
import RecentOrdersTableSkeleton from '../components/skeletons/RecentOrdersTableSkeleton';
import TopProductsListSkeleton from '../components/skeletons/TopProductsListSkeleton';

function OverviewPage() {
  const { isLoading, isError, ...data } = useOverviewData();

  if (isLoading) return <OverviewSkeleton />;

  if (isError)
    return <Error title="Overview" message="Failed to load overview data!" />;

  return (
    <div className="flex flex-col gap-regular md:gap-base">
      <KpiSection kpiCards={data.KpiCards} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-regular md:gap-base">
        <div className="md:h-auto md:col-span-7 lg:col-span-8">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart revenueData={data.revenueData} />
          </Suspense>
        </div>

        <div className="md:h-auto md:col-span-5 lg:col-span-4">
          <OrderStatusChart orderStatusData={data.orderStatusData} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-regular md:gap-base">
        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <RatingsOverview ratings={data.ratings} />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <RecentOfflineSalesList
            recentOfflineSales={data.recentOfflineSales}
          />
        </div>

        <div className="col-span-2 lg:col-span-6">
          <TopCitiesList topCities={data.topCities} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-regular md:gap-base">
        <div className="lg:col-span-8">
          <Suspense fallback={<RecentOrdersTableSkeleton />}>
            <RecentOrdersTable recentOrders={data.recentOrders} />
          </Suspense>
        </div>

        <div className="lg:col-span-4">
          <Suspense fallback={<TopProductsListSkeleton />}>
            <TopProductsList topProducts={data.topProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
