import KpiCard from './KpiCard';
import type { KpiCardType } from '../types';
import { memo } from 'react';

type KpiSectionProps = {
  kpiCards: KpiCardType[];
};

function KpiSection({ kpiCards }: KpiSectionProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-base">
      {kpiCards?.map((card: KpiCardType) => (
        <KpiCard key={card.id} stat={card} />
      ))}
    </section>
  );
}

export default memo(KpiSection);
