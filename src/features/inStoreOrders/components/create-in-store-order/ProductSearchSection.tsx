import Heading from '@/components/shared/Heading';
import Icon from '@/components/shared/Icon';
import { Input } from '@/components/ui/input';
import { ROUTE_PATHS } from '@/routes/paths';
import { Link } from 'react-router-dom';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function ProductSearchSection({ searchQuery, setSearchQuery }: Props) {
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchQuery.trim());
    }
  };

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-sm w-fit">
          <Link
            to={ROUTE_PATHS.dashboard.orders.inStore}
            className="flex items-center p-sm hover:text-black hover:bg-accent-soft border border-gray-300 hover:border-transparent rounded-md transition-colors duration-normal"
          >
            <Icon name="ArrowLeft" className="text-current" />
          </Link>
        </div>

        <Heading as="h4">Add items</Heading>

        <p className="">Search to find and add items.</p>
      </div>

      <div className="md:p-compact">
        <Input
          type="search"
          placeholder="Search by product code"
          className="form-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
        />
      </div>
    </div>
  );
}

export default ProductSearchSection;
