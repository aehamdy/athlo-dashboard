function Header() {
  return (
    <header className="bg-light rounded-xl">
      <div className="flex justify-between items-center p-regular">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-3xl">Hello, Admin! 👋</h2>

          <p className="">Here's your overview of your business</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent-focus rounded-full"></div>

            <div className="">
              <h3 className="font-semibold ">John Doe</h3>
              <p className="">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
