import { NavLink } from 'react-router-dom';
import type { NavItemType } from './navItems';
import Icon from '@/components/shared/Icon';
import { useState } from 'react';

type NavItemProps = {
  item: NavItemType;
  onNavigate?: () => void;
};

function NavItem({ item, onNavigate }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  if (item.children) {
    return (
      <li className="w-full">
        {/* Parent */}
        <button
          onClick={toggleExpand}
          className="flex justify-between items-center w-full py-compact px-lg font-medium text-light hover:text-dark hover:bg-accent-soft rounded-3xl cursor-pointer duration-normal"
        >
          <div className="flex items-center gap-2">
            <Icon name={item.icon} className="text-current" />
            {item.label}
          </div>

          <Icon
            name="ChevronDown"
            size={20}
            className={`text-current transition duration-normal ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Children */}
        {isExpanded && (
          <ul className="pl-6 mt-2 space-y-2">
            {item.children.map((child) => (
              <li key={child.id} className="ps-md">
                <NavLink
                  to={child.href!}
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full py-compact px-base font-medium ${
                      isActive
                        ? 'text-dark bg-accent'
                        : 'text-light hover:text-dark hover:bg-accent-soft'
                    } rounded-3xl duration-normal`
                  }
                >
                  <Icon name={child.icon} size={14} className="text-current" />

                  {child.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <NavLink
      to={item.href!}
      onClick={onNavigate}
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
