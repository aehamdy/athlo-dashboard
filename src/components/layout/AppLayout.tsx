import Sidebar from "../shared/Sidebar";
import MainContent from "./MainContent";

function AppLayout() {
  return (
    <section className="h-screen grid grid-cols-12 p-tiny md:p-regular lg:py-sm lg:pe-sm text-light bg-linear-to-tl from-black to-[#074120] overflow-hidden">
      {/* Sidebar on desktop */}
      <div className="hidden lg:block lg:col-span-2 h-full">
        <Sidebar />
      </div>

      <div className="col-span-12 lg:col-span-10 h-full min-h-0">
        <MainContent />
      </div>
    </section>
  );
}

export default AppLayout;
