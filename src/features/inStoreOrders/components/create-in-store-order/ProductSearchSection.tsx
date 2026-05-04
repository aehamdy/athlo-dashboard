import Heading from '@/components/shared/Heading';
import { Input } from '@/components/ui/input';

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
