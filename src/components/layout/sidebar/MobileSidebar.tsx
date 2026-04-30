import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../../ui/button';
import Icon from '../../shared/Icon';
import Logo from '../../shared/Logo';
import NavList from '../navigation/NavList';
import LogoutButton from '@/features/auth/components/LogoutButton';

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 cursor-pointer border-0"
        >
          <Icon name="Menu" className="text-accent size-3xl" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-8/10 sm:max-w-[400px] bg-linear-to-br from-gradient-from to-gradient-to shadow-lg z-60"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="px-base">
          <NavList />
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <LogoutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
