import { Frown, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Heading from "@/components/sharedComponents/Heading";

function NotFound() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center gap-xl">
        {/* Animated 404 Text */}
        <div className="relative w-full">
          <Heading className="flex flex-col items-center gap-xl text-9xl lg:text-9xl font-bold text-neutral-300 animate-pulse">
            404
          </Heading>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <Heading as="h3" className="mb-2 font-bold text-4xl">
                Page Not Found
              </Heading>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Oops! The page you're looking for doesn't exist or has been
                moved.
              </p>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative w-64 h-64 mx-auto">
          <div className="absolute inset-0 bg-accent/60 dark:bg-indigo-900/30 rounded-full opacity-70 animate-pulse"></div>
          <div className="relative flex items-center justify-center h-full">
            <Frown className="w-32 h-32 text-neutral-600 dark:text-indigo-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className={cn(
              "group relative overflow-hidden",
              "bg-accent-soft hover:bg-accent-strong",
              "text-dark hover:text-light font-medium py-6 px-8 rounded-xl",
              "transition-all duration-normal hover:shadow-lg hover:shadow-accent-500/30",
              "hover:translate-y-[-2px]"
            )}
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            className={cn(
              "group relative overflow-hidden",
              "text-gray-700 dark:text-gray-300 font-medium py-6 px-8 rounded-xl",
              "hover:bg-accent-soft dark:hover:bg-gray-800 transition-all duration-300 ",
              "border-gray-300 dark:border-gray-600",
              "hover:translate-y-[-2px]"
            )}
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
