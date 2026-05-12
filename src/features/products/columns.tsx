import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from './types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTE_PATHS } from '@/routes/paths';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/shared/Icon';
import AppImage from '@/components/shared/AppImage';
import Currency from '@/components/shared/Currency';

export const productColumns = (
  onDelete: (id: number) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: 'name',
    header: 'Product',
    cell: ({ row }) => (
      <div className="flex items-center gap-compact font-medium text-foreground">
        <div className="w-16 max-w-[200px] h-16 rounded-md overflow-hidden">
          <AppImage
            src={row.original.images[0]}
            alt={row.original.name || 'Product image'}
            className="w-full h-full object-cover"
          />
        </div>

        <span className="truncate max-w-49">
          {row.original.name || 'Unnamed Product'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: 'brandName',
    header: 'Brand',
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: 'club',
    header: 'Club',
    cell: ({ row }) => {
      const club = row.original.club;

      if (!club || club.trim() === '') {
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
    accessorKey: 'season',
    header: 'Season',
    cell: ({ getValue }) => {
      const season = getValue<string>();

      if (!season || season.trim() === '') {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <Badge className="inline-flex items-center font-medium px-2 py-1 text-xs text-dark bg-muted rounded-md">
          {getValue<string>()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'basePrice',
    header: 'Price',
    cell: ({ row }) => {
      const { basePrice, minPrice, maxPrice } = row.original;

      const productPrice =
        minPrice && maxPrice && minPrice < maxPrice
          ? `${minPrice.toLocaleString()} ~ ${maxPrice.toLocaleString()}`
          : basePrice;

      return (
        <div className="flex justify-center items-center gap-xs font-medium">
          {productPrice}
          <span className="text-gray-400">
            <Currency />
          </span>
        </div>
      );
    },
  },
  {
    id: 'discountedPrice',
    header: 'Discounted',
    cell: ({ row }) => {
      const {
        minPriceAfterDiscount,
        maxPriceAfterDiscount,
        minPrice,
        maxPrice,
      } = row.original;

      const hasDiscount =
        minPriceAfterDiscount! < minPrice! ||
        maxPriceAfterDiscount! < maxPrice!;

      if (!hasDiscount) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="text-red-500">{`${minPriceAfterDiscount} &pound; ~ ${maxPriceAfterDiscount} &pound;`}</div>
      );
    },
  },
  {
    accessorKey: 'variants',
    header: 'Has Variants?',
    cell: ({ row }) => {
      const hasVariants = row.original.hasVariants;

      if (!hasVariants) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex justify-center items-center text-sm font-medium">
          <Icon name="Check" className="text-accent" />
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-gray-50 hover:bg-gray-100">
            <Button
              variant="plain"
              className="focus-visible:ring-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="Ellipsis" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  to={ROUTE_PATHS.dashboard.editProduct(
                    row.original.id,
                    'info',
                  )}
                  className="flex items-center gap-xs"
                >
                  <Icon name="PencilIcon" />
                  Edit Info
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Link
                  to={ROUTE_PATHS.dashboard.editProduct(
                    row.original.id,
                    'media',
                  )}
                  className="flex items-center gap-xs"
                >
                  <Icon name="Images" />
                  Edit Media
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={() => {
                  onDelete(row.original.id);
                }}
              >
                <Icon name="TrashIcon" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
