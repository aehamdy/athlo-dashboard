import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';
import RevenueChart from '../components/RevenueChart';
import OrderStatusChart from '../components/OrderStatusChart';

function OverviewPage() {
  return (
    <div className="flex flex-col gap-sm md:gap-base lg:gap-base">
      <Header />

      <KpiSection />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-base h-[850px] md:h-[450px]">
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>

        <div className="lg:col-span-4">
          <OrderStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-base">
        <div className="col-span-2">
          <RatingsOverview />
        </div>

        <div className="col-span-3 grid place-items-center bg-white rounded-md">
          Recent POS Sales Placeholder
        </div>

        <div className="col-span-5 grid place-items-center bg-white rounded-md">
          Top Cities Placeholder
        </div>
      </div>

      <div className="grid grid-cols-10 gap-base">
        <div className="col-span-7 h-20 bg-white rounded-md">
          Recent Orders Placeholder
        </div>

        <div className="col-span-3 h-20 bg-white rounded-md">
          Top Products Placeholder
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
