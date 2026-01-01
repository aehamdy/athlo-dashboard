import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Nav from "../Nav";
import Heading from "./Heading";

function Header() {
  return (
    <header className="bg-light rounded-xl">
      <div className="flex justify-between items-center p-compact lg:p-regular">
        <div className="flex flex-col gap-2">
          <Heading as="h2">Hello, Admin! 👋</Heading>

          <p className="">Here's your overview of your business</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent-focus rounded-full"></div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Menu />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-8/10 sm:max-w-[400px] bg-dark shadow-lg z-60"
                >
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-left">
                      Profile Settings
                    </SheetTitle>

                    <SheetDescription className="text-left">
                      Manage your profile information and preferences
                    </SheetDescription>
                  </SheetHeader>

                  <div className="px-base">
                    <Nav />
                  </div>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
