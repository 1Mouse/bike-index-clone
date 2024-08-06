import * as React from "react";

import { cn } from "@/lib/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block h-[50px] w-full appearance-none rounded border border-slate-300 bg-white px-5 py-3.5 text-black shadow-none",
          "placeholder:text-black/80",
          "focus:border focus:border-purple focus:shadow-none focus:outline-none focus:outline-0 focus:ring-0 focus:ring-transparent",
          "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
