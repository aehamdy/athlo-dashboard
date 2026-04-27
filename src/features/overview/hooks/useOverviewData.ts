// useOverviewData.ts

import { useQuery } from '@tanstack/react-query';
import overviewService from '../services/overviewService';
import { mapKpiToStatCards } from '../utils/mapKpiToStatCards';

export const useOverviewData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['overview'],
    queryFn: () => overviewService.getOverview(),
  });
  const KpiCards = data ? mapKpiToStatCards(data?.data?.data?.kpiCards) : [];

  return {
    KpiCards,
    isLoading,
    isError,
  };
};
