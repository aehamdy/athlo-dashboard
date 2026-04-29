import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';
import RevenueChart from '../components/RevenueChart';
import OrderStatusChart from '../components/OrderStatusChart';
import RecentOfflineSalesList from '../components/RecentOfflineSalesList';
import TopProductsList from '../components/TopProductsList';
import RecentOrdersTable from '../components/RecentOrdersTable';
import TopCitiesList from '../components/TopCitiesList';
import { useOverviewData } from '../hooks/useOverviewData';
import Error from '@/components/shared/Error';
import OverviewSkeleton from '../components/skeletons/OverviewSkeleton';

function OverviewPage() {
  const { isLoading, isError, ...data } = useOverviewData();

  if (isLoading) return <OverviewSkeleton />;

  if (isError)
    return <Error title="Overview" message="Failed to load overview data!" />;

  return (
    <div className="flex flex-col gap-regular md:gap-base">
      <Header />

      <KpiSection kpiCards={data.KpiCards} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-regular md:gap-base">
        <div className="md:h-auto md:col-span-7 lg:col-span-8">
          <RevenueChart revenueData={data.revenueData} />
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
          <RecentOrdersTable recentOrders={data.recentOrders} />
        </div>

        <div className="lg:col-span-4">
          <TopProductsList topProducts={data.topProducts} />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
