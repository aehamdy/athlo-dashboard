import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableWrapper from "@/components/shared/TableWrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import TableHeadRow from "@/components/shared/TableHeadRow";
import { Badge } from "@/components/ui/badge";
import { COUPON_TABLE_COLUMNS } from "@/config/tableColumns";
import { formatDateTime } from "@/utils/formatDateTime ";

type CouponData = {
  id: number;
  code: string;
  name: string;
  percentage: number;
  startDate: string;
  endDate: string;
  type: string;
};

const data: CouponData[] = [
  {
    id: 1003,
    code: "WHITE10",
    name: "White Friday",
    percentage: 10,
    startDate: "2026-02-01T16:46:37.981",
    endDate: "2026-02-26T16:46:37.981",
    type: "Global",
  },
];

function CouponsTable() {
  return (
    <TableWrapper>
      <Table className="rounded-md overflow-hidden">
        <TableCaption>A list of your recent coupons.</TableCaption>

        <TableHeadRow tableCols={COUPON_TABLE_COLUMNS} />

        <TableBody>
          {data.map((coupon) => {
            const { date: startDate } = formatDateTime(coupon.startDate);
            const { date: endDate } = formatDateTime(coupon.endDate);

            return (
              <TableRow key={coupon.id}>
                <TableCell className="text-start font-semibold">
                  <Badge className="bg-accent text-dark rounded-md">
                    {coupon.code}
                  </Badge>
                </TableCell>

                <TableCell className="text-center">{coupon.name}</TableCell>

                <TableCell className="text-center">
                  <Badge className="font-bold text-white bg-red-500 rounded-md">
                    % {coupon.percentage}
                  </Badge>
                </TableCell>

                <TableCell className="text-center font-medium text-cyan-600">
                  {startDate}
                </TableCell>

                <TableCell className="text-center font-medium text-cyan-600">
                  {endDate}
                </TableCell>

                <TableCell className="text-center font-semibold">
                  {coupon.type}
                </TableCell>

                <TableCell className="flex justify-end items-center gap-tiny text-end">
                  <Button
                    variant="icon"
                    // onClick={() => handleOnUpdate(product)}
                    className="px-2 hover:text-blue-500"
                  >
                    <SquarePen />
                  </Button>
                  <Button
                    variant="icon"
                    // onClick={() => handleProductDelete(product.id)}
                    className="px-2 hover:text-red-500"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default CouponsTable;
