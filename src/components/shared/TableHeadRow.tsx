import { TableHead, TableHeader, TableRow } from "../ui/table";

type TableHeadProps = {
  tableCols: string[];
};

function TableHeadRow({ tableCols }: TableHeadProps) {
  return (
    <TableHeader className="bg-neutral cursor-default">
      <TableRow>
        {tableCols.map((col) => (
          <TableHead
            key={col}
            className="text-center first:text-start last:text-end"
          >
            {col}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default TableHeadRow;
