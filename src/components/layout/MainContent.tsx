import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import { Toaster } from "../ui/sonner";

function MainContent() {
  return (
    <section className="h-full p-sm md:p-regular lg:p-sm text-dark bg-light-muted rounded-3xl">
      <div className="flex flex-col gap-sm md:gap-base lg:gap-sm h-full">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          className: "font-medium text-sm border rounded-xl !shadow-xl",
          classNames: {
            success: "!bg-emerald-100 !text-emerald-700 !border-emerald-400",
            error: "!bg-red-100 !text-red-600 !border-red-400",
            warning: "!bg-amber-100 !text-amber-600 !border-amber-400",
            info: "!bg-blue-100 !text-blue-600 !border-blue-400",
            actionButton:
              "!bg-white !text-black !hover:bg-gray-200 !rounded-md !px-3",
            closeButton: "!text-white !hover:text-gray-200",
          },
        }}
      />
    </section>
  );
}

export default MainContent;
