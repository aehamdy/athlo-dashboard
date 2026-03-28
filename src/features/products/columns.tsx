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

export const productColumns = (
  onDelete: (id: number) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: 'name',
    header: 'Product',
    cell: ({ row }) => (
      <div className="flex items-center gap-compact font-medium text-foreground">
        <div className="w-16 h-16 rounded-md overflow-hidden">
          <AppImage
            src={row.original.images[0]}
            alt={row.original.name || 'Product image'}
            className="w-full h-full object-cover"
          />
        </div>

        {row.original.name || 'Unnamed Product'}
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
    accessorKey: 'season',
    header: 'Season',
    cell: ({ getValue }) => (
      <Badge className="inline-flex items-center font-medium px-2 py-1 text-xs text-dark bg-muted rounded-md">
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    accessorKey: 'basePrice',
    header: 'Base Price',
    cell: ({ getValue }) => {
      const value = getValue<number>();

      return <span className="font-medium">${value.toLocaleString()}</span>;
    },
  },
  {
    id: 'discountedPrice',
    header: 'Discounted',
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="bg-gray-100 hover:bg-gray-200"
          >
            <Button
              variant="plain"
              className="focus-visible:ring-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="Ellipsis" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
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

              <DropdownMenuItem className="cursor-pointer">
                <Link
                  to={ROUTE_PATHS.dashboard.editProduct(
                    row.original.id,
                    'variants',
                  )}
                  className="flex items-center gap-xs"
                >
                  <Icon name="Layers" />
                  Edit Variants
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
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
