import { useQuery } from '@tanstack/react-query';
import overviewService from '../services/overviewService';
import { mapKpiToStatCards } from '../utils/mapKpiToStatCards';

export const useOverviewData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['overview'],
    queryFn: () => overviewService.getOverview(),
  });

  const KpiCards = data ? mapKpiToStatCards(data?.data?.data?.kpiCards) : [];
  const revenueData = data?.data?.data?.revenueChart;
  const orderStatusData = data?.data?.data?.ordersByStatus;
  const ratings = data?.data?.data?.ratingsOverview;
  const recentOfflineSales = data?.data?.data?.recentPosSales;
  const topProducts = data?.data?.data?.topProducts;

  return {
    KpiCards,
    revenueData,
    orderStatusData,
    ratings,
    recentOfflineSales,
    topProducts,
    isLoading,
    isError,
  };
};
