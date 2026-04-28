import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';
import RevenueChart from '../components/RevenueChart';
import OrderStatusChart from '../components/OrderStatusChart';
import RecentOfflineSalesList from '../components/RecentOfflineSalesList';
import TopProductsList from '../components/TopProductsList';
import RecentOrdersTable from '../components/RecentOrdersTable';

function OverviewPage() {
  return (
    <div className="flex flex-col gap-regular md:gap-base">
      <Header />

      <KpiSection />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-regular md:gap-base h-[850px] md:h-[450px]">
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>

        <div className="lg:col-span-4">
          <OrderStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-regular md:gap-base h-[400px] md:h-[320px]">
        <div className="col-span-1 lg:col-span-3">
          <RatingsOverview />
        </div>

        <div className="col-span-1 lg:col-span-3">
          <RecentOfflineSalesList />
        </div>

        <div className="col-span-2 lg:col-span-6">Top Cities Placeholder</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-regular md:gap-base h-[400px] md:h-[320px]">
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
