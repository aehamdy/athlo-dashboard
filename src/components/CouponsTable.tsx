import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import TableWrapper from "./sharedComponents/TableWrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "./ui/table";
import TableHeadRow from "./sharedComponents/TableHeadRow";
import { COUPON_TABLE_COLUMNS } from "@/config/tableColumns";

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
          {data.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.code}</TableCell>

              <TableCell>{coupon.name}</TableCell>

              <TableCell>{coupon.percentage}</TableCell>

              <TableCell>{coupon.startDate}</TableCell>

              <TableCell>{coupon.endDate}</TableCell>

              <TableCell>{coupon.type}</TableCell>

              <TableCell className="flex justify-end items-center gap-tiny">
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
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default CouponsTable;
