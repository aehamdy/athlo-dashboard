import { NavLink } from 'react-router-dom';
import type { NavItemType } from './navItems';
import Icon from '@/components/shared/Icon';

function NavItem({ item }: { item: NavItemType }) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center gap-2 w-full py-compact px-base font-medium ${
          isActive
            ? 'text-dark bg-accent'
            : 'text-light hover:text-dark hover:bg-accent-soft'
        } rounded-3xl duration-normal`
      }
    >
      <Icon name={item.icon} size={22} className="text-current" />

      <p>{item.label}</p>
    </NavLink>
  );
}

export default NavItem;
