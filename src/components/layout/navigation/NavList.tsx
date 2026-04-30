import navItems from './navItems';
import NavItem from './NavItem';

function NavList() {
  return (
    <nav className="w-full">
      <ul className="flex flex-col items-center gap-md">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default NavList;
