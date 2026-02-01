import { SquarePen, Trash2 } from "lucide-react";
import TableWrapper from "./sharedComponents/TableWrapper";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

type CouponData = {
  id: number;
  code: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  status: "ACTIVE" | "EXPIRED" | "DISABLED" | "SCHEDULED";
  usageCount: number | null;
  usageLimit: number | null;
  expiresAt: string | null;
  createdAt: string;
};

const tableCols = [
  "Code",
  "Discount",
  "Type",
  "Status",
  "Usage Count",
  "Usage Limit",
  "Created At",
  "Expires At",
  "Actions",
];

const data: CouponData[] = [
  {
    id: 1,
    code: "WELCOME10",
    discountValue: 10,
    discountType: "PERCENTAGE", // PERCENTAGE | FIXED
    status: "ACTIVE", // ACTIVE | EXPIRED | DISABLED | SCHEDULED
    usageCount: 42,
    usageLimit: 100,
    expiresAt: "2026-03-31",
    createdAt: "2026-01-05",
  },
  {
    id: 2,
    code: "FREESHIP",
    discountValue: 50,
    discountType: "FIXED",
    status: "ACTIVE",
    usageCount: 12,
    usageLimit: null, // unlimited
    expiresAt: null, // no expiry
    createdAt: "2026-01-10",
  },
  {
    id: 3,
    code: "WINTER25",
    discountValue: 25,
    discountType: "PERCENTAGE",
    status: "EXPIRED",
    usageCount: 100,
    usageLimit: 100,
    expiresAt: "2025-12-31",
    createdAt: "2025-11-20",
  },
  {
    id: 4,
    code: "SPORT100",
    discountValue: 100,
    discountType: "FIXED",
    status: "DISABLED",
    usageCount: 5,
    usageLimit: 20,
    expiresAt: "2026-06-30",
    createdAt: "2026-01-15",
  },
  {
    id: 5,
    code: "RAMADAN15",
    discountValue: 15,
    discountType: "PERCENTAGE",
    status: "SCHEDULED",
    usageCount: 0,
    usageLimit: 300,
    expiresAt: "2026-04-15",
    createdAt: "2026-02-01",
  },
];

function CouponsTable() {
  return (
    <TableWrapper>
      <Table className="rounded-md overflow-hidden">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-neutral cursor-default">
          <TableRow className="text-center">
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

        <TableBody>
          {data.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell className="text-start">{coupon.code}</TableCell>
              <TableCell className="text-center">
                {coupon.discountValue}
              </TableCell>
              <TableCell className="text-center">
                {coupon.discountType}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={`${
                    coupon.status.toLowerCase() === "active"
                      ? "text-green-700 bg-green-200"
                      : coupon.status.toLowerCase() === "expired"
                        ? "text-red-600 bg-red-200"
                        : coupon.status.toLowerCase() === "scheduled"
                          ? "text-yellow-600 bg-yellow-200"
                          : coupon.status.toLowerCase() === "disabled"
                            ? "text-gray-800 bg-gray-300"
                            : ""
                  } rounded-sm`}
                >
                  {coupon.status.charAt(0).toUpperCase() +
                    coupon.status.slice(1).toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{coupon.usageCount}</TableCell>
              <TableCell className="text-center">
                {coupon.usageLimit ? coupon.usageLimit : "-"}
              </TableCell>
              <TableCell className="text-center">{coupon.createdAt}</TableCell>
              <TableCell className="text-center">
                {coupon.expiresAt ? coupon.expiresAt : "-"}
              </TableCell>

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
