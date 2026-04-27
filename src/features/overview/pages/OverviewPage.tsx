import Header from '@/components/shared/Header';
import KpiSection from '../components/KpiSection';

function OverviewPage() {
  return (
    <div className="flex flex-col gap-sm md:gap-base lg:gap-sm h-full">
      <Header />

      <KpiSection />

      <div className="grid place-items-center h-1/2 bg-white rounded-md">
        Sales Chart
      </div>

      <div className="grid place-items-center h-1/2 bg-white rounded-md">
        Recent Orders
      </div>
    </div>
  );
}

export default OverviewPage;
