import { ROUTE_PATHS } from '@/routes/paths';
import type * as Icons from 'lucide-react';

export interface NavItemType {
  id: number;
  label: string;
  href?: string;
  icon: keyof typeof Icons;
  children?: NavItemType[];
}

const navItems: NavItemType[] = [
  {
    id: 1,
    label: 'Overview',
    href: ROUTE_PATHS.dashboard.overview,
    icon: 'LayoutDashboard',
  },
  {
    id: 2,
    label: 'Products',
    href: ROUTE_PATHS.dashboard.products,
    icon: 'Shirt',
  },
  {
    id: 3,
    label: 'Categories',
    href: ROUTE_PATHS.dashboard.categories,
    icon: 'ListTodo',
  },
  {
    id: 4,
    label: 'Brands',
    href: ROUTE_PATHS.dashboard.brands,
    icon: 'Tags',
  },
  {
    id: 5,
    label: 'Orders',
    icon: 'ShoppingBag',
    children: [
      {
        id: 51,
        label: 'E-Commerce',
        href: ROUTE_PATHS.dashboard.orders.eCommerce,
        icon: 'ShoppingCart',
      },
      {
        id: 52,
        label: 'In-Store',
        href: ROUTE_PATHS.dashboard.orders.inStore,
        icon: 'ShoppingBasket',
      },
    ],
  },
  {
    id: 7,
    label: 'Coupons',
    href: ROUTE_PATHS.dashboard.coupons,
    icon: 'BadgePercent',
  },
  {
    id: 8,
    label: 'Users',
    href: ROUTE_PATHS.dashboard.users,
    icon: 'UsersRound',
  },
];

export default navItems;
