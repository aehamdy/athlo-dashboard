import type React from "react";
import { Button } from "../ui/button";
import Heading from "./Heading";
import { Plus } from "lucide-react";

interface DashboardSectionProps {
  children: React.ReactNode;
  title: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

function DashboardSection({
  children,
  title,
  buttonLabel,
  onButtonClick,
}: DashboardSectionProps) {
  return (
    <section
      className={`flex flex-col gap-6 h-full p-compact lg:p-regular bg-light rounded-xl`}
    >
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-2xl font-semibold">
          {title}
        </Heading>

        {buttonLabel && onButtonClick && (
          <Button
            className="flex items-center gap-2 text-dark bg-accent hover:bg-accent/80 active:bg-accent/60 cursor-pointer"
            onClick={onButtonClick}
          >
            <Plus />
            {buttonLabel}
          </Button>
        )}
      </div>

      {children}
    </section>
  );
}

export default DashboardSection;
