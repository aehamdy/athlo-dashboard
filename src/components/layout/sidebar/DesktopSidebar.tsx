import Logo from '../../shared/Logo';
import LogoutButton from '../../../features/auth/components/LogoutButton';
import NavList from '../navigation/NavList';

function DesktopSidebar() {
  return (
    <aside className="flex flex-col items-center gap-6xl py-sm pe-sm h-full">
      <div className="py-4 lg:py-1">
        <Logo />
      </div>

      <div className="flex flex-col justify-between w-full h-full">
        <NavList />

        <div className="flex w-full">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
