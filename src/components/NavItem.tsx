import { NavLink } from "react-router-dom";
import type { NavItemType } from "./Nav";

function NavItem({ item }: { item: NavItemType }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center gap-2 w-full py-compact px-base font-medium ${
          isActive
            ? "text-dark bg-accent"
            : "text-light hover:text-dark hover:bg-accent-soft"
        } rounded-3xl duration-normal`
      }
    >
      <Icon />
      <p className="">{item.label}</p>
    </NavLink>
  );
}

export default NavItem;
