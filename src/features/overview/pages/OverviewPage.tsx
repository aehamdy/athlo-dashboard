import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';
import RevenueChart from '../components/RevenueChart';
import OrderStatusChart from '../components/OrderStatusChart';
import RecentOfflineSalesList from '../components/RecentOfflineSalesList';
import TopProductsList from '../components/TopProductsList';
import RecentOrdersTable from '../components/RecentOrdersTable';
import TopCitiesList from '../components/TopCitiesList';

function OverviewPage() {
  return (
    <div className="flex flex-col gap-regular md:gap-base">
      <Header />

      <KpiSection />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-regular md:gap-base">
        <div className="md:h-auto md:col-span-7 lg:col-span-8">
          <RevenueChart />
        </div>

        <div className="md:h-auto md:col-span-5 lg:col-span-4">
          <OrderStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-regular md:gap-base">
        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <RatingsOverview />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <RecentOfflineSalesList />
        </div>

        <div className="col-span-2 lg:col-span-6">
          <TopCitiesList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-regular md:gap-base">
        <div className="lg:col-span-8">
          <RecentOrdersTable />
        </div>

        <div className="lg:col-span-4">
          <TopProductsList />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
