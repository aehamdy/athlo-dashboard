import {
  ChartColumnIncreasing,
  LayoutDashboard,
  ListTodo,
  Shirt,
  ShoppingCart,
} from "lucide-react";
import NavItem from "./NavItem";

import type { ComponentType, SVGProps } from "react";

export interface NavItemType {
  id: number;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const navItems: NavItemType[] = [
  {
    id: 1,
    label: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: "Products",
    href: "/products",
    icon: Shirt,
  },
  {
    id: 3,
    label: "Categories",
    href: "/categories",
    icon: ListTodo,
  },
  {
    id: 4,
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    id: 5,
    label: "Analytics",
    href: "/analytics",
    icon: ChartColumnIncreasing,
  },
];

function Nav() {
  return (
    <nav className="flex flex-col items-center gap-md w-full">
      {navItems.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}
    </nav>
  );
}

export default Nav;
