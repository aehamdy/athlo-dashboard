import MainContent from './MainContent';
import DesktopSidebar from './sidebar/DesktopSidebar';

function AppLayout() {
  return (
    <section className="h-screen grid lg:grid-cols-14 p-tiny md:p-regular lg:py-sm lg:pe-sm text-light bg-linear-to-br from-gradient-from to-gradient-to overflow-hidden">
      <div className="hidden lg:block lg:col-span-2 h-full">
        <DesktopSidebar />
      </div>

      <div className="lg:col-span-12 h-full min-h-0">
        <MainContent />
      </div>
    </section>
  );
}

export default AppLayout;
