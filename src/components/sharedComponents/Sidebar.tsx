import Nav from "../Nav";

function Sidebar() {
  return (
    <aside className="flex flex-col items-center gap-6xl px-sm">
      <div className="py-4 lg:py-1">
        <h1 className="font-bold text-4xl italic">Logo</h1>
      </div>

      <Nav />
    </aside>
  );
}

export default Sidebar;
