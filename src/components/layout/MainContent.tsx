import { Outlet } from "react-router-dom";
import Header from "../sharedComponents/Header";

function MainContent() {
  return (
    <section className="h-full p-sm lg:p-regular text-dark bg-light-muted rounded-3xl">
      <div className="flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default MainContent;
