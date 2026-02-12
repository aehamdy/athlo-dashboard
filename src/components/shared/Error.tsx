import { AlertTriangle } from "lucide-react";
import Heading from "./Heading";

type ErrorProps = {
  title: string;
  message: string;
};

function Error({ title, message }: ErrorProps) {
  return (
    <div
      className={`flex items-center justify-center h-full bg-light rounded-xl
        `}
    >
      <div className="flex flex-col items-center gap-4 text-center bg-light p-8 rounded-xl w-full">
        <div className="flex items-center justify-center w-28 h-28 rounded-full text-red-500 bg-red-500/10 ">
          <AlertTriangle size={60} />
        </div>

        <div className="space-y-1">
          <Heading as="h3">
            Failed to load <span className="text-accent">{title}</span>
          </Heading>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Error;
