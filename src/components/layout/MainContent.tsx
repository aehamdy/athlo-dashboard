import { Outlet } from "react-router-dom";
import Header from "../shared/Header";

function MainContent() {
  return (
    <section className="h-full p-sm md:p-regular lg:p-sm text-dark bg-light-muted rounded-3xl">
      <div className="flex flex-col gap-sm md:gap-base lg:gap-tiny h-full">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default MainContent;
