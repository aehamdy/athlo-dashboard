import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { City } from '../types';

type TopCitiesListProps = {
  topCities: City[];
};

function TopCitiesList({ topCities }: TopCitiesListProps) {
  return (
    <Card className="h-full gap-sm">
      <CardHeader>
        <CardTitle>Top Cities</CardTitle>
      </CardHeader>

      <CardContent className="h-content overflow-hidden">
        <ul className="h-[300px] space-y-sm overflow-y-auto">
          {topCities?.map((city: City, index: number) => (
            <li
              key={city.city}
              className="flex flex-col gap-xs p-sm rounded-md bg-light-muted"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">
                  {index + 1}. {city.city}
                </span>

                <div className="text-xs text-muted-foreground">
                  {city.percentage}%
                </div>
              </div>

              <div className="w-full h-2 bg-light-subtle rounded-md overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${city.percentage}%` }}
                />
              </div>

              <span className="text-end text-xs text-muted-foreground">
                {city.ordersCount} orders
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default TopCitiesList;
