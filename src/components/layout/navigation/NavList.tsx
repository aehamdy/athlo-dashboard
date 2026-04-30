import navItems from './navItems';
import NavItem from './NavItem';

type NavListProps = {
  onNavigate?: () => void;
};

function NavList({ onNavigate }: NavListProps) {
  return (
    <nav className="w-full">
      <ul className="flex flex-col items-center gap-md">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  );
}

export default NavList;
