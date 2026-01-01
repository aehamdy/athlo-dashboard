import {
  LayoutDashboard,
  ListTodo,
  Shirt,
  ShoppingCart,
  Tags,
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
    label: "Brands",
    href: "/brands",
    icon: Tags,
  },
  {
    id: 5,
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
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
