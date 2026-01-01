import Sidebar from "../sharedComponents/Sidebar";
import MainContent from "./MainContent";

function AppLayout() {
  return (
    <section className="h-screen grid grid-cols-12 p-sm md:p-regular lg:py-base lg:pe-base text-light bg-dark-muted overflow-hidden">
      {/* Sidebar on desktop */}
      <div className="hidden lg:block lg:col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-12 lg:col-span-10 h-full">
        <MainContent />
      </div>
    </section>
  );
}

export default AppLayout;
