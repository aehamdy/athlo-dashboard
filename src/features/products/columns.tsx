import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const productColumns = (
  onDelete: (id: number) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ getValue }) => (
      <div className="font-medium text-foreground">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "brandName",
    header: "Brand",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "season",
    header: "Season",
    cell: ({ getValue }) => (
      <Badge className="inline-flex items-center font-medium px-2 py-1 text-xs text-dark bg-muted rounded-md">
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    accessorKey: "basePrice",
    header: "Base Price",
    cell: ({ getValue }) => {
      const value = getValue<number>();

      return <span className="font-medium">${value.toLocaleString()}</span>;
    },
  },
  {
    id: "discountedPrice",
    header: "Discounted",
    cell: ({ row }) => {
      const { basePrice, priceAfterDiscount } = row.original;

      if (priceAfterDiscount < basePrice) {
        return (
          <span className="font-semibold text-green-600">
            ${priceAfterDiscount.toLocaleString()}
          </span>
        );
      }

      return <span className="text-muted-foreground">-</span>;
    },
  },
  {
    accessorKey: "club",
    header: "Club",
    cell: ({ row }) => {
      const club = row.original.club;

      if (!club || club.trim() === "") {
        return <span className="text-muted-foreground">-</span>;
      }

      const onlyQuestionMarks = /^\?+$/.test(club);

      if (onlyQuestionMarks) {
        return <span className="text-muted-foreground">-</span>;
      }

      return <span className="text-sm">{club}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              console.log("Edit", row.original.id);
            }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
