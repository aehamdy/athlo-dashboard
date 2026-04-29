import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useOverviewData } from '../hooks/useOverviewData';
import Currency from '@/components/shared/Currency';
import { formatDateTime } from '@/utils/formatDateTime';
import type { RecentOfflineSale } from '../types';

function RecentOfflineSalesList() {
  const { recentOfflineSales } = useOverviewData();

  return (
    <Card className="h-full gap-sm">
      <CardHeader className="ps-sm">
        <h3 className="font-semibold text-sm">Recent Offline Sales</h3>
      </CardHeader>

      <CardContent className="px-sm">
        <ul className="space-y-sm">
          {recentOfflineSales?.map((sale: RecentOfflineSale) => {
            const { date, time } = formatDateTime(sale.saleDate);

            return (
              <li
                key={sale.id}
                className="flex justify-between items-start gap-sm p-sm bg-light-muted rounded-md"
              >
                <div className="flex flex-col gap-tiny text-sm">
                  <h4 className="font-semibold text-tiny">{sale.saleNumber}</h4>

                  <p className="text-tiny text-muted-foreground">
                    {date} - {time}
                  </p>
                </div>

                <div className="flex items-center gap-tiny font-semibold text-xs">
                  <Currency symbol /> {sale.finalAmount.toLocaleString()}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export default RecentOfflineSalesList;
