import { Input } from "@/components/ui/input";

type DataTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
};

function DataTableToolbar({
  search,
  onSearchChange,
  placeholder = "Search...",
  children,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-base">
      <div className="px-compact md:px-regular lg:px-sm">
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {children}
    </div>
  );
}

export default DataTableToolbar;
