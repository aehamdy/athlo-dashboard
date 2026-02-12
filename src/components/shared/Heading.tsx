// components/sharedComponents/Heading.tsx
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const headingVariants = cva("font-bold text-gray-900 dark:text-white", {
  variants: {
    size: {
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-2xl md:text-3xl",
      h4: "text-xl md:text-2xl",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
    },
  },
  defaultVariants: {
    size: "h3",
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Heading({
  as: Component = "h3",
  size,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size: size || Component, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Heading;
