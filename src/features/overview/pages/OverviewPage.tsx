import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';
import RatingsOverview from '../components/RatingsOverview';

function OverviewPage() {
  return (
    <div className="flex flex-col gap-sm md:gap-base lg:gap-sm h-full">
      <Header />

      <KpiSection />

      <div className="grid grid-cols-10 gap-sm">
        <div className="col-span-2">
          <RatingsOverview />
        </div>
      </div>

      <div className="grid place-items-center h-1/2 bg-white rounded-md">
        Recent Orders
      </div>
    </div>
  );
}

export default OverviewPage;
