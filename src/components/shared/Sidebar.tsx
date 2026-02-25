import Nav from "../Nav";
import Logo from "./Logo";
import LogoutButton from "../../features/auth/components/LogoutButton";

function Sidebar() {
  return (
    <aside className="flex flex-col items-center gap-6xl py-sm pe-sm h-full">
      <div className="py-4 lg:py-1">
        <Logo />
      </div>

      <div className="flex flex-col justify-between w-full h-full">
        <Nav />

        <LogoutButton />
      </div>
    </aside>
  );
}

export default Sidebar;
