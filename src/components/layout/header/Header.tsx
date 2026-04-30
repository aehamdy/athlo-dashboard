import HeaderGreeting from './HeaderGreeting';
import HeaderActions from './HeaderActions';

function Header() {
  return (
    <header className="bg-light">
      <div className="flex justify-between items-center p-compact lg:py-sm lg:px-lg">
        <HeaderGreeting />

        <HeaderActions />
      </div>
    </header>
  );
}

export default Header;
