import type * as Icons from 'lucide-react';

export interface NavItemType {
  id: number;
  label: string;
  href: string;
  icon: keyof typeof Icons;
}

const navItems: NavItemType[] = [
  {
    id: 1,
    label: 'Overview',
    href: '/overview',
    icon: 'LayoutDashboard',
  },
  {
    id: 2,
    label: 'Products',
    href: '/products',
    icon: 'Shirt',
  },
  {
    id: 3,
    label: 'Categories',
    href: '/categories',
    icon: 'ListTodo',
  },
  {
    id: 4,
    label: 'Brands',
    href: '/brands',
    icon: 'Tags',
  },
  {
    id: 5,
    label: 'Orders',
    href: '/orders',
    icon: 'ShoppingCart',
  },
  {
    id: 6,
    label: 'Coupons',
    href: '/coupons',
    icon: 'BadgePercent',
  },
  {
    id: 7,
    label: 'Users',
    href: '/users',
    icon: 'UsersRound',
  },
];

export default navItems;
