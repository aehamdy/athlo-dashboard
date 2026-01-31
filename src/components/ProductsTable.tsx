import type { Product } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import TableWrapper from "./sharedComponents/TableWrapper";
import http from "@/api/http";
import { API_ENDPOINTS } from "@/api/endPoints";

function ProductsTable({ data }: { data: Product[] }) {
  const handleProductDelete = (id: number) => {
    console.log(id);
    http.delete(API_ENDPOINTS.products.delete(id));
  };

  return (
    <TableWrapper>
      <Table className="rounded-md overflow-hidden">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-neutral cursor-default">
          <TableRow className="text-center">
            <TableHead className="w-50 text-start">Product</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Brand</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((product) => (
            <TableRow key={product.id} className="text-center">
              <TableCell className="font-medium">
                <div className="flex items-center gap-sm">
                  <div className="w-14 h-14 overflow-hidden rounded-sm">
                    <img
                      src={product.images[0]}
                      // alt={product.name}
                      alt={product.code}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="">{product.name}</div>
                </div>
              </TableCell>

              <TableCell>{product.categoryName}</TableCell>

              <TableCell>{product.brandName}</TableCell>

              <TableCell>Active</TableCell>

              <TableCell className="">
                <span className="font-semibold">&pound;</span>{" "}
                {product.basePrice}
              </TableCell>

              <TableCell className="">
                <div className="flex justify-end items-center gap-tiny">
                  <Button variant="icon" className="px-2 hover:text-blue-500">
                    <SquarePen />
                  </Button>

                  <Button
                    variant="icon"
                    onClick={() => handleProductDelete(product.id)}
                    className="px-2 hover:text-red-500"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default ProductsTable;
