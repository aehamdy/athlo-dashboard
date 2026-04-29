import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Currency from '@/components/shared/Currency';
import { useOverviewData } from '../hooks/useOverviewData';
import type { TopProductsType } from '../types';
import AppImage from '@/components/shared/AppImage';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import Icon from '@/components/shared/Icon';

function TopProductsList() {
  const { topProducts } = useOverviewData();

  return (
    <Card className="gap-sm space-y-xs lg:space-y-regular">
      <CardHeader className="flex justify-between items-center ps-sm">
        <h3 className="font-semibold text-sm">Top Products 🔥</h3>

        <Link
          to={ROUTE_PATHS.dashboard.products}
          className="group flex items-center gap-tiny font-medium text-xs text-accent-strong hover:text-accent transition-all duration-normal"
        >
          View All Products{' '}
          <Icon
            name="ArrowRight"
            className="text-accent-strong group-hover:text-accent duration-normal group-hover:translate-x-tiny"
          />
        </Link>
      </CardHeader>

      <CardContent className="px-sm">
        <ul className="h-[230px] overflow-auto space-y-sm">
          {topProducts?.map((sale: TopProductsType) => {
            return (
              <li
                key={sale.productId}
                className="flex justify-between items-start gap-sm p-sm bg-light-muted rounded-md"
              >
                <div className="flex items-start gap-sm">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <AppImage src={sale.imageUrl} alt={sale.productName} />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="font-semibold text-xs truncate max-w-[200px]">
                      {sale.productName}
                    </h4>

                    <p className="text-muted-foreground text-xs">
                      {sale.totalQuantitySold} units sold
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-tiny font-semibold text-xs text-green-500">
                  <Currency symbol /> {sale.totalRevenue.toLocaleString()}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export default TopProductsList;
