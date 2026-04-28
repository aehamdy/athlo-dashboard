import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';
import RevenueChart from '../components/RevenueChart';

function OverviewPage() {
  return (
    <div className="flex flex-col gap-sm md:gap-base lg:gap-base">
      <Header />

      <KpiSection />

      <div className="grid grid-cols-10 gap-base">
        <div className="col-span-10 md:col-span-6 lg:col-span-7">
          <RevenueChart />
        </div>

        <div className="col-span-10 md:col-span-4 lg:col-span-3 grid place-items-center bg-white rounded-md">
          Order Status Placeholder
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
