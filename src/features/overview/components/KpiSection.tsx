import Error from '@/components/shared/Error';
import { useOverviewData } from '../hooks/useOverviewData';
import KpiCard from './KpiCard';
import KpiCardSkeleton from './skeletons/KpiCardSkeleton';

function KpiSection() {
  const { KpiCards, isLoading, isError } = useOverviewData();
  const skeletons = Array.from({ length: 4 });

  if (!isLoading && (!KpiCards || KpiCards.length === 0)) {
    return (
      <section className="text-center py-8 text-gray-500">
        No data available.
      </section>
    );
  }

  if (isError) {
    return <Error title="KPIs" message="Failed to load KPI data." />;
  }

  return (
    <section
      aria-busy={isLoading}
      className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-base"
    >
      {isLoading
        ? skeletons.map((_, index) => (
            <article key={index} className="h-full">
              <KpiCardSkeleton aria-hidden="true" />
            </article>
          ))
        : KpiCards?.map((card) => <KpiCard key={card.id} stat={card} />)}
    </section>
  );
}

export default KpiSection;
